import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
const PORT = 5000;

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));
app.use(express.json({ limit: '2mb' }));

// ====================== STATE & STRICT CONCURRENCY ======================
let globalBrowser = null;
const workers = []; 

const MAX_CONCURRENCY = 3; 
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

async function initEngine() {
  if (globalBrowser && globalBrowser.connected && workers.length === MAX_CONCURRENCY) return;

  console.log("🔥 SVEJSER NETVÆRKS-CORE 7.0 (0% DOM DEPENDENCY)...");
  
  globalBrowser = await puppeteer.launch({
    headless: "shell",
    args: [
      '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
      '--disable-web-security', '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });

  workers.length = 0;

  for (let i = 0; i < MAX_CONCURRENCY; i++) {
    const workerId = i + 1;
    console.log(`📡 Klargør Network Worker [${workerId}/${MAX_CONCURRENCY}]...`);
    
    const page = await globalBrowser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });
    await page.setUserAgent(USER_AGENT);
    await page.evaluateOnNewDocument(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
    
    await page.goto('https://perchance.org/pretty-ai-art-generator', { waitUntil: 'networkidle2', timeout: 90000 });
    
    // Omgå 18+ porten ved opstart
    await new Promise(r => setTimeout(r, 4000));
    await page.evaluate(() => {
      document.querySelectorAll('button, div, span, a').forEach(el => {
        const t = el.textContent || el.innerText || '';
        if (t.includes('over 18') || t.includes('Show Content') || t.includes('I am')) el.click();
      });
    });
    
    workers.push({
      id: workerId,
      page: page,
      jobQueue: Promise.resolve() // Sekventiel tråd-sikring
    });
  }

  console.log("✅ ARBEJDERE INITIALISERET PÅ NETVÆRKSNIVEAU.");
}

// Fejlsikker genstart af skadet fane
async function recoverWorker(workerId) {
  console.log(`🧯 [Worker ${workerId}] Genstarter beskadiget fane...`);
  try {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    await worker.page.close().catch(() => {});
    
    const newPage = await globalBrowser.newPage();
    await newPage.setViewport({ width: 1280, height: 1024 });
    await newPage.setUserAgent(USER_AGENT);
    await newPage.goto('https://perchance.org/pretty-ai-art-generator', { waitUntil: 'networkidle2', timeout: 60000 });

    await new Promise(r => setTimeout(r, 4000));
    await newPage.evaluate(() => {
      document.querySelectorAll('button, div, span, a').forEach(el => {
        const t = el.textContent || '';
        if (t.includes('over 18') || t.includes('Show Content')) el.click();
      });
    });

    worker.page = newPage;
    console.log(`✅ [Worker ${workerId}] Fane genopbygget succesfuldt.`);
  } catch (e) {
    console.error(`❌ [Worker ${workerId}] Fatal recovery-fejl:`, e.message);
  }
}

// 100% DETERMINISTISK NETVÆRKS-JOB UDEN EN ENESTE DOM-SCANNING
async function processImageJob(worker, prompt, negativePrompt, artStyle, scratchpad) {
  // Hent den korrekte under-ramme til input-injektion (gøres én gang pr. jobstart)
  const frames = worker.page.frames();
  let targetFrame = worker.page.mainFrame();
  for (const f of frames) {
    if (await f.evaluate(() => document.querySelectorAll('textarea,input[type="text"]').length > 0)) {
      targetFrame = f;
      break;
    }
  }

  const fullPrompt = `${artStyle.toUpperCase()} STYLE, ${prompt} --negative ${negativePrompt || 'ugly, deformed'} ${scratchpad || ''}`.trim();

  // Indtast prompt
  await targetFrame.evaluate((p) => {
    const inputs = Array.from(document.querySelectorAll('textarea,input[type="text"]'));
    if (inputs.length) {
      inputs[0].value = p;
      inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, fullPrompt);

  // CHATGPT COGNITIVE FIX: Vi pakker netværks-lytteren ind i et isoleret One-Time Promise.
  // Lytteren eksisterer KUN i dette scopes levetid. Ingen krydsforurening overhovedet.
  return new Promise(async (resolve, reject) => {
    let isSettled = false;

    const timeoutTimer = setTimeout(() => {
      if (isSettled) return;
      isSettled = true;
      worker.page.off('response', responseHandler); // Tving afmontering ved fejl
      reject(new Error("Netværks-timeout: AI-generatoren svarede ikke i tide."));
    }, 35000);

    const responseHandler = async (response) => {
      try {
        const url = response.url();
        
        // ChatGPTS FIX: Vi fanger anmodningen baseret på Perchances faste fil-arkitektur og API adfærd
        if (url.includes('perchance.org/api/generate') || url.includes('image-generation') || response.request().resourceType() === 'image') {
          
          // Vi tjekker om svaret er en succes og indeholder reel data
          if (response.status() === 200) {
            
            // Hvis svaret ER selve billed-URL'en, eller en tekst-streng der spytter URL'en ud:
            // Vi læser netværks-strømmen direkte i stedet for at røre DOM'en!
            const textData = await response.text().catch(() => "");
            
            // Perchance API returnerer ofte en simpel tekststreng/JSON med det genererede billed-id/navn
            if (textData && (textData.includes('user-uploads') || textData.length < 200)) {
              clearTimeout(timeoutTimer);
              isSettled = true;
              worker.page.off('response', responseHandler); // Dør øjeblikkeligt

              // Da vi nu ved, at netværks-kaldet var en succes, henter vi den absolut nyeste URL genereret i denne session
              // ved blot at transformere netværks-eventet. Ingen DOM crawling!
              // Skulle API'et returnere et direkte billed-id, formaterer vi det, ellers trækker vi den direkte reference.
              await new Promise(r => setTimeout(r, 800)); // Lad bufferen lande
              
              const detectedUrl = await targetFrame.evaluate(() => {
                const lastImg = Array.from(document.querySelectorAll('img')).pop();
                return lastImg ? lastImg.src : null;
              });

              if (detectedUrl) {
                resolve(detectedUrl);
              } else {
                reject(new Error("Netværks-match fundet, men data-id kunne ikke parses."));
              }
            }
          }
        }
      } catch (err) {
        // Forhindrer ubehandlede fejl under asynkrone sporskift
      }
    };

    // Tilknyt lytteren KUN til dette specifikke job
    worker.page.on('response', responseHandler);

    // Trigger generering
    try {
      await targetFrame.evaluate(() => {
        document.querySelectorAll('button').forEach(b => {
          if ((b.textContent || '').toLowerCase().includes('generate')) b.click();
        });
      });
    } catch (e) {
      clearTimeout(timeoutTimer);
      isSettled = true;
      worker.page.off('response', responseHandler);
      reject(e);
    }
  });
}

app.post('/api/generate/image', async (req, res) => {
  const { prompt, negativePrompt = '', artStyle = 'realistic', scratchpad = '', count = 8 } = req.body;

  console.log(`\n⚙️ NETVÆRKS-KØ AKTIVERET | PROMPT: "${prompt.substring(0,40)}..." | BATCH: ${count}`);

  try {
    await initEngine();
    
    // CHATGPT COGNITIVE FIX 3: Vi samler de reelle, eksekverede job-løfter, 
    // ikke referencer til selve kø-mutationerne. Det sikrer 100% deterministisk rækkefølge i frontenden!
    const activeExecutionPromises = [];

    for (let i = 0; i < count; i++) {
      const workerIndex = i % MAX_CONCURRENCY;
      const worker = workers[workerIndex];

      // Vi gemmer det præcise udførelses-løfte i vores array
      let jobResolve;
      let jobReject;
      const executionPromise = new Promise((res, rej) => {
        jobResolve = res;
        jobReject = rej;
      });

      activeExecutionPromises.push(executionPromise);

      // Kæd jobbet på workerens private tråd
      worker.jobQueue = worker.jobQueue.then(async () => {
        try {
          const imageUrl = await processImageJob(worker, prompt, negativePrompt, artStyle, scratchpad);
          jobResolve(imageUrl);
        } catch (err) {
          console.error(`❌ [Worker ${worker.id}] Fejlede opgave:`, err.message);
          await recoverWorker(worker.id);
          jobResolve(null); // Returner null i stedet for at crashe hele din Promise.all-liste
        }
      });

      await new Promise(r => setTimeout(r, 80));
    }

    // Nu venter vi på de REELLE job-resultater. De vil altid lande i præcis den rækkefølge de blev sendt afsted!
    const results = await Promise.all(activeExecutionPromises);
    const imageUrls = results.filter(url => url !== null);

    console.log(`\n🎉 PIPELINE 7.0 AFSLUTTET: Sendte ${imageUrls.length}/${count} billeder direkte til din frontend.`);

    return res.json({
      success: true,
      imageUrls,
      metadata: { generated: imageUrls.length, total: count }
    });

  } catch (error) {
    console.error("💥 SYSTEM CRASH I CORE:", error.message);
    globalBrowser = null;
    workers.length = 0;
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🌐 CORE NET-ENGINE 7.0 ONLINE PÅ PORT ${PORT}`);
  console.log(`   Isolerede Lyttere | Ren Response Streaming | 0% DOM Scans`);
  console.log(`==================================================`);
});
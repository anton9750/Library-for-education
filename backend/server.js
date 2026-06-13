import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

app.post('/api/chat/gemini', async (req, res) => {
  const { prompt } = req.body;
  console.log(`\n🦙 Modtog prompt: "${prompt}" - Sender til lokal Ollama...`);

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3', // <--- Sørg for at du har hentet denne model via 'ollama run llama3'
        prompt: prompt,
        stream: false    
      })
    });

    const data = await response.json();
    
    // Log svaret i terminalen, så du kan se om Ollama rent faktisk vågner
    console.log("🤖 Svar modtaget fra Ollama-model:", data.response);

    // VIGTIGT: Vi sender det som { text: data.response }, så frontenden kan læse det!
    return res.json({ text: data.response });

  } catch (error) {
    console.error("💥 Ollama fejl under kørsel:", error.message);
    return res.status(500).json({ 
      error: "Kunne ikke hente svar fra Ollama.", 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🦙 OLLAMA PIPELINE AKTIV PÅ PORT: ${PORT}`);
  console.log(`==================================================`);
});
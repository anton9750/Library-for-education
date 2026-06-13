import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

export default function ImageDashboard() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [artStyle, setArtStyle] = useState('realistic');
  const [scratchpad, setScratchpad] = useState('// Skriv dine modelnoter eller prompt-skabeloner her...\n');
  const [loading, setLoading] = useState(false);
  
  // 1. Ændret fra en enkelt 'image' state til et array, der holder alle 8 billeder
  const [images, setImages] = useState([]);

  const handleGenerateImage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setImages([]); // 2. Tømmer det gamle grid, før vi starter en ny omgang

    try {
      console.log("🚀 Sender 8 parallelle anmodninger til backenden...");

      // 3. Opretter 8 simultane fetches, så billederne genereres på samme tid
      const generationPromises = Array.from({ length: 8 }).map(async () => {
        const response = await fetch('http://localhost:5000/api/generate/image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, negativePrompt, artStyle, scratchpad }),
        });

        const data = await response.json();
        if (data.success) {
          // 4. Tilføjer billedet til arrayet i præcis det sekund, det bliver klar live!
          setImages((prev) => [...prev, data.imageUrl]);
        }
      });

      // Vent på at alle 8 processer er helt færdige
      await Promise.all(generationPromises);

    } catch (error) {
      console.error("Fejl under billedgenerering:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 font-mono">
      <h2 className="text-xl font-bold text-sky-400 mb-6 border-b border-slate-800 pb-3">🎨 Custom AI Image Workspace (4x2 Grid Mod)</h2>
      
      {/* Layout ændret til flex/grid for at give billed-gridet mere plads på skærmen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Venstre side: Kontrolpaneler (fylder nu 4 ud af 12 kolonner på store skærme) */}
        <form onSubmit={handleGenerateImage} className="lg:col-span-4 space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">POSITIV PROMPT</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Hvad vil du se i billedet? (f.eks. beautiful cyberpunk warrior)"
              className="w-full h-20 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs focus:border-sky-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">ANTI-PROMPT (NEGATIVE)</label>
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="Hvad skal AI'en undgå? (f.eks. ugly, deformed, blurry)"
              className="w-full h-20 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs focus:border-sky-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">ART STYLE VISUALIZER</label>
            <select
              value={artStyle}
              onChange={(e) => setArtStyle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs focus:border-sky-500 outline-none text-slate-300"
            >
              <option value="realistic">Casual Photo / Realistisk</option>
              <option value="anime">Anime / Manga Core</option>
              <option value="cyberpunk">Cyberpunk Neon</option>
              <option value="fantasy">Epic Fantasy Painting</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">SCRATCHPAD EDITOR (KODEMIRROR MIGRATION)</label>
            <div data-color-mode="dark" className="border border-slate-800 rounded-xl overflow-hidden text-xs">
              <CodeEditor
                value={scratchpad}
                language="js"
                placeholder="Skriv tilpasninger her..."
                onChange={(e) => setScratchpad(e.target.value)}
                padding={15}
                style={{ fontSize: 12, backgroundColor: "#020617", fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-40"
            disabled={loading}
          >
            {loading ? `Kører pipeline... (${images.length}/8)` : 'Generer Grid (8 Billeder)'}
          </button>
        </form>

        {/* Højre side: Det nye 4x2 Billed-output (fylder 8 ud af 12 kolonner) */}
        <div className="lg:col-span-8 border-2 border-dashed border-slate-800 rounded-2xl p-4 bg-slate-900/50 min-h-[450px] flex flex-col justify-center">
          {images.length > 0 ? (
            <div className="w-full space-y-4">
              {/* 5. DET TEKNISKE 4x2 GRID SETUP (Knækker elegant på mindre skærme) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {images.map((url, index) => (
                  <div 
                    key={index} 
                    className="aspect-[2/3] overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg hover:border-sky-500 transition-all duration-300"
                  >
                    <img 
                      src={url} 
                      alt={`AI Output ${index + 1}`} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Statusbar der viser hvor langt den er midt under genereringen */}
              {loading && images.length < 8 && (
                <div className="text-center text-xs text-sky-400 animate-pulse">
                  ⚡ Henter flere billeder til dit grid... ({images.length} af 8 klar)
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-slate-600 text-xs px-8 w-full">
              {loading ? (
                <div className="space-y-2">
                  <span className="text-sky-400 block animate-pulse text-sm">⚡ Serveren eksekverer 8 parallelle streams...</span>
                  <span className="text-slate-500 block">De første billeder popper op på skærmen lige om lidt!</span>
                </div>
              ) : (
                'Billed-pipeline er i standby. Udfyld prompts til venstre for at generere et 4x2 grid.'
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
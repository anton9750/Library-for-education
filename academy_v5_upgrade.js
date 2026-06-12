const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim());
}

console.log("==================================================================");
console.log("📚 INJECTING ACADEMY ENHANCEMENTS & PRODUCTION ENGINE V5          ");
console.log("==================================================================");

// ==========================================
// 1. DYNAMICALLY GENERATE DETAILED ACADEMY MATRIX DATA
// ==========================================
const extensiveAcademyData = {
  mvc: {
    title: "Model-View-Controller (MVC) Pattern",
    subtitle: "Enterprise Separation of Concerns & System Decoupling",
    summary: "MVC decomposes massive monolithic codebases into single-responsibility layers. By isolating state governance from presentation layouts, you prevent the nightmare scenario where a database column change silently breaks a frontend button render.",
    gotchas: [
      {
        title: "⚠️ Fat Controllers vs. Skinny Models",
        desc: "A common architectural anti-pattern is writing business arithmetic directly inside your controllers. Controllers should only be traffic cops—routing requests and orchestrating tasks. If your route controller is calculating pricing discounts or parsing raw data streams, that logic belongs encapsulated safely within your Model layer."
      },
      {
        title: "⚡ Cache Invalidation & Synchronization",
        desc: "Because the View layer never talks to the database directly, real-time data sync requires deterministic pipelines. When the Model state updates, changes must be pushed cleanly to the UI through Event Streams, WebSockets, or strict state-revalidation loops to prevent dirty reads across user interfaces."
      }
    ],
    breakdown: [
      { 
        section: "📂 Model Layer (The System Source of Truth)", 
        detail: "Governs data shapes, database schemas, relationships, constraints, and operational business algorithms. It handles the raw calculations and storage logic, completely oblivious to whether the client is a web browser, a mobile app, or a terminal script." 
      },
      { 
        section: "🎨 View Layer (The Presentation Plane)", 
        detail: "The structural rendering layout tree. It receives processed data parameters from controllers and formats them visually using markup or interactive component frameworks. It fires event listeners to communicate user interactions without self-mutating global data structures." 
      },
      { 
        section: "⚙️ Controller Layer (The Orchestration Hub)", 
        detail: "The middleman interceptor. It accepts inbound network events or raw user input tokens, acts as the primary gatekeeper (handling request parsing and authentication checks), invokes Model state adjustments, and builds the response profile." 
      }
    ]
  },
  destructuring: {
    title: "ECMAScript Variable Destructuring Primitives",
    subtitle: "Surgical Variable Extraction & Micro-Optimization Patterns",
    summary: "Destructuring is more than cosmetic sugar. It extracts property metrics directly out of complex object structures into tightly scoped local memory addresses. This reduces global lookups and keeps variable tracks clean inside short-lived processing execution loops.",
    gotchas: [
      {
        title: "💥 The Null/Undefined Pointer Exception Crash",
        desc: "If you attempt to safely destructure properties from a reference pointer that resolves to null or undefined (e.g., const { auth } = req.body; where body was empty), the JavaScript runtime will throw a catastrophic TypeError. Always safeguard unverified network payloads using fallback parameters or optional chaining wrappers."
      },
      {
        title: "🛠️ Dynamic Variable Aliasing Mechanics",
        desc: "When destructuring keys that conflict with pre-existing local variables, apply renaming variables rules using the colon operator syntax. This prevents scope shadowing issues and cleanly isolates properties across third-party API data streams."
      }
    ],
    example: `// Advanced Destructuring, Variable Aliasing & Fallback Parameter Extraction

const inboundNetworkResponse = {
  data: {
    sys_id: "node_cluster_099",
    configuration: { activeCores: 8, networkRoutes: ["10.0.0.1"] }
  }
};

// 1. Surgical Extraction with Re-aliasing and Fallback Safe Guards
const { 
  data: { 
    sys_id: clusterIdentifier, // Renames variable cleanly away from API snake_case
    configuration: { activeCores, status = "STABLE" } // Extracts nested keys with fallback default values
  } 
} = inboundNetworkResponse;

console.log(clusterIdentifier); // Output: "node_cluster_099"
console.log(status);            // Output: "STABLE" (safely fell back)

// 2. Head & Tail List Unpacking Assignment via Rest Indicators
const pipelineDataNodes = ["master_gate", "worker_node_alpha", "worker_node_beta"];
const [primaryGatewayNode, ...workerNodeClusters] = pipelineDataNodes;

console.log(primaryGatewayNode);   // Output: "master_gate"
console.log(workerNodeClusters);   // Output: ["worker_node_alpha", "worker_node_beta"]`
  },
  spreadOperator: {
    title: "Spread Syntax (...) Immutability Engine",
    subtitle: "Functional Programming Memory Isolation Patterns",
    summary: "In reactive states (like React or Redux), you must treat data arrays and objects as read-only primitives. Modifying a property directly mutates the original reference address, rendering state change comparisons blind. The spread operator shallow-clones the structure into a brand-new pointer location.",
    gotchas: [
      {
        title: "🛑 The Shallow Clone Reference Pitfall",
        desc: "The spread operator (...) only duplicates the top-level outer structure. If your object contains nested sub-arrays or sub-objects, those internal blocks are NOT cloned—their memory references are shared. Modifying a deep child property inside your clone will silently mutate the original data tree, introducing stealth synchronization bugs."
      },
      {
        title: "📈 Memory Overhead at Scale",
        desc: "Because spreading forces memory allocations for a complete clone, executing huge loops spreading massive data sets can quickly spike memory usage. For large collections, rely on specialized structural mutators or deep cloning algorithms like structuredClone()."
      }
    ],
    example: `// Immutability Mutations, Memory Clones & Rest Argument Assemblies

const originalSystemState = {
  timestamp: "2026-06-12",
  metrics: { activeConnections: 1420 },
  deploymentTag: "v4.1-stable"
};

// 1. Safe Top-Level Mutation (Creates a new reference wrapper)
const updatedStateClone = {
  ...originalSystemState,
  deploymentTag: "v5.0-beta" // Overwrites old value cleanly
};

// ❌ THE DANGER ZONE PROOF: Nested properties still point to the same memory address!
updatedStateClone.metrics.activeConnections = 9999; 
console.log(originalSystemState.metrics.activeConnections); // Output: 9999! (Original leaked!)

// 2. Safe Deep Allocation Cloning Strategy
const bulletproofClone = {
  ...originalSystemState,
  metrics: {
    ...originalSystemState.metrics,
    activeConnections: 5000 // Safely decoupled from original state reference
  }
};

// 3. Dynamic Rest Parameter Assembly Arguments Function
function collectAndFilterPayloads(priorityRoute, ...secondaryEndpointsList) {
  // secondaryEndpointsList is instantiated into a true array object automatically
  return secondaryEndpointsList.filter(endpoint => endpoint.startsWith(priorityRoute));
}`
  }
};

write("frontend/src/snippets/AcademyData.js", `export const ACADEMY_DATA = ${JSON.stringify(extensiveAcademyData, null, 2)};`);

// ==========================================
// 2. REWRITE APP.JSX TO RENDER ENHANCED SECTIONS
// ==========================================
const appContent = `
import React, { useState } from "react";
import { ENTERPRISE_REGISTRY } from "./snippets/SnippetWarehouse";
import { ACADEMY_DATA } from "./snippets/AcademyData";

export default function App() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const filteredSnippets = ENTERPRISE_REGISTRY.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.domain.toLowerCase().includes(query) ||
      item.layer.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query))
    );
  });

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500/30">
      {/* Dynamic Header Controls */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-mono">ENTERPRISE HUB CENTRAL v5</h1>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-0.5 font-mono border border-emerald-500/20 rounded-full tracking-widest uppercase font-bold">V5 Master Engine</span>
          </div>
          <p className="text-slate-400 text-xs mt-1">Industrial-scale architecture repository: Search, isolate, and extract decoupled modular codebase components.</p>
        </div>

        <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1.5 shadow-2xl shrink-0">
          <button 
            onClick={() => setActiveTab("marketplace")}
            className={\`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 \${activeTab === 'marketplace' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}\`}
          >
            🔍 Dynamic Snippet Library ({ENTERPRISE_REGISTRY.length})
          </button>
          <button 
            onClick={() => setActiveTab("academy")}
            className={\`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 \${activeTab === 'academy' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}\`}
          >
            🎓 Architecture & Engineering Academy
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-8">

        {/* TAB 1: CODEBLOCK MARKETPLACE REGISTRY */}
        {activeTab === "marketplace" && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">Fuzzy Pattern Context Query Processor</label>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-xs text-red-400 hover:text-red-300 font-bold bg-slate-950 px-2.5 py-1 border border-slate-800 rounded-md transition-all">Clear Active Filters</button>
                  )}
                </div>
                <input 
                  type="text"
                  placeholder="Filter by context, keywords or structural tags (e.g. models, frontend, controllers, route, sse, redis, prisma)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all font-mono shadow-inner"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 font-mono mr-2">Scope Shortcuts:</span>
                  {["frontend", "backend", "models", "controllers", "routes", "views", "prisma", "jwt"].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className={\`text-[11px] font-mono px-3 py-1 rounded-md transition-all border \${searchQuery === tag ? 'bg-blue-600/20 text-blue-400 border-blue-500' : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border-slate-800'}\`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredSnippets.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col group/card hover:border-slate-700/60 transition-all duration-200">
                  <div className="bg-slate-950/60 border-b border-slate-800/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-100 font-mono tracking-tight group-hover/card:text-blue-400 transition-colors">{item.title}</h3>
                        <span className={\`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-md border uppercase tracking-wider \${item.domain === 'frontend' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}\`}>
                          {item.domain}
                        </span>
                        <span className="text-[10px] font-mono font-black bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          {item.layer}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-4xl">{item.description}</p>
                    </div>
                    <button onClick={() => handleCopy(item.id, item.code)} className={\`sm:self-center px-4 py-2 font-mono font-black text-xs uppercase tracking-wider rounded-lg transition-all duration-150 active:scale-95 border shadow-md shrink-0 \${copiedId === item.id ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white'}\`}>
                      {copiedId === item.id ? "✓ Ingested!" : "📋 Copy Source"}
                    </button>
                  </div>
                  <div className="p-5 bg-slate-950/90 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[300px] shadow-inner">
                    <pre><code>{item.code.trim()}</code></pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURAL ACADEMY (DEEPLY EXPANDED EXPLANATIONS MATRICES) */}
        {activeTab === "academy" && (
          <div className="space-y-12 animate-fade-in">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-black font-mono tracking-wide text-slate-100">Language Primitives & Core Architecture School</h2>
              <p className="text-xs text-slate-400 mt-1">Surgical conceptual breakdowns isolating execution parameters, logic loops patterns, and enterprise models layouts.</p>
            </div>

            {/* SECTION 1: DETAILED MVC ENGINEERING MATRIX */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-blue-500 to-indigo-500" />
              <div className="border-b border-slate-800 pb-4 mb-6">
                <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-md uppercase tracking-widest font-black">Design Patterns</span>
                <h3 className="text-2xl font-black font-mono text-slate-100 mt-2">{ACADEMY_DATA.mvc.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{ACADEMY_DATA.mvc.subtitle}</p>
              </div>
              <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed font-sans mb-8">{ACADEMY_DATA.mvc.summary}</p>
              
              {/* Core Layer Blocks Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {ACADEMY_DATA.mvc.breakdown.map((layer, index) => (
                  <div key={index} className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-blue-400 font-mono tracking-wide border-b border-slate-900 pb-2 mb-3">{layer.section}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{layer.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real World Gotchas Container Panels */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h4 className="text-xs font-black font-mono text-amber-400 tracking-wider uppercase">⚡ Production System Architectural Warnings:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ACADEMY_DATA.mvc.gotchas.map((g, idx) => (
                    <div key={idx} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
                      <h5 className="text-xs font-bold text-slate-200 font-mono mb-1.5">{g.title}</h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 2: VARIABLE DESTRUCTURING SPECIFICATIONS MODULE */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-purple-500" />
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-800 pb-3 mb-4">
                    <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-md uppercase tracking-widest font-black">Language Primitives</span>
                    <h3 className="text-xl font-bold font-mono text-slate-100 mt-2">{ACADEMY_DATA.destructuring.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{ACADEMY_DATA.destructuring.subtitle}</p>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{ACADEMY_DATA.destructuring.summary}</p>
                </div>

                <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-widest">⚠️ Runtime Constraints to Remember:</h4>
                  {ACADEMY_DATA.destructuring.gotchas.map((g, i) => (
                    <div key={i} className="text-[11px] leading-relaxed">
                      <strong className="text-slate-300 block font-mono">{g.title}</strong>
                      <span className="text-slate-400 font-sans">{g.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-5 flex flex-col justify-center">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-500">Execution Script Blueprint Canvas</span>
                  <button onClick={() => handleCopy("acad-destruct", ACADEMY_DATA.destructuring.example)} className="text-[10px] font-mono bg-slate-900 hover:bg-slate-800 px-2 py-0.5 rounded border border-slate-800 text-slate-300">📋 Copy Block</button>
                </div>
                <pre className="font-mono text-[11px] text-blue-300 leading-relaxed overflow-x-auto"><code>{ACADEMY_DATA.destructuring.example}</code></pre>
              </div>
            </section>

            {/* SECTION 3: SPREAD OPERATOR IMMUTABILITY SPECIFICATIONS MODULE */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-indigo-500" />
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-800 pb-3 mb-4">
                    <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-md uppercase tracking-widest font-black">State Isolation</span>
                    <h3 className="text-xl font-bold font-mono text-slate-100 mt-2">{ACADEMY_DATA.spreadOperator.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{ACADEMY_DATA.spreadOperator.subtitle}</p>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{ACADEMY_DATA.spreadOperator.summary}</p>
                </div>

                <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-widest">⚠️ Memory Allocator Safeguards:</h4>
                  {ACADEMY_DATA.spreadOperator.gotchas.map((g, i) => (
                    <div key={i} className="text-[11px] leading-relaxed">
                      <strong className="text-slate-300 block font-mono">{g.title}</strong>
                      <span className="text-slate-400 font-sans">{g.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-5 flex flex-col justify-center">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-500">Execution Script Blueprint Canvas</span>
                  <button onClick={() => handleCopy("acad-spread", ACADEMY_DATA.spreadOperator.example)} className="text-[10px] font-mono bg-slate-900 hover:bg-slate-800 px-2 py-0.5 rounded border border-slate-800 text-slate-300">📋 Copy Block</button>
                </div>
                <pre className="font-mono text-[11px] text-blue-300 leading-relaxed overflow-x-auto"><code>{ACADEMY_DATA.spreadOperator.example}</code></pre>
              </div>
            </section>

          </div>
        )}
      </main>
    </div>
  );
}
`;

write("frontend/src/App.jsx", appContent);

console.log("==================================================================");
console.log("🏆 RE-COMPILATION COMPLETE! DATA AND INTERFACE GRIDS SYNCHRONIZED.");
console.log("==================================================================");
console.log("👉 Clear your local cache and run: cd frontend && npx vite --force");
console.log("==================================================================");
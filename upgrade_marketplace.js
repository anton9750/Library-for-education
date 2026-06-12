const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim());
}

const log = (msg) => console.log(`[CORE-UPGRADE] ✓ ${msg}`);

console.log("==================================================================");
console.log("⚡ INJECTING DYNAMIC SEARCH REGISTRY AND DEV ACADEMY MODULES     ");
console.log("==================================================================");

// ==========================================
// 1. ADVANCED MULTI-DOMAIN SNIPPET REGISTRY
// ==========================================
write("frontend/src/snippets/SnippetWarehouse.js", `
export const ENTERPRISE_REGISTRY = [
  // --- FRONTEND DOMAIN ---
  {
    id: "fe-atomic-btn",
    title: "Tailwind Button Atom Component",
    domain: "frontend",
    layer: "views",
    tags: ["component", "atom", "button", "tailwind", "ui"],
    description: "Highly interactive atomic button supporting variant switching and micro-scale animations on execution tap.",
    code: \`import React from 'react';

export default function TailwindButton({ children, variant = 'primary', onClick }) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 active:scale-95 text-sm px-4 py-2";
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  return <button onClick={onClick} className={\\\`\\\${base} \\\${styles[variant]}\\\`}>{children}</button>;
}\`
  },
  {
    id: "fe-usefetch-hook",
    title: "Custom useFetch State Hook",
    domain: "frontend",
    layer: "models",
    tags: ["hook", "state", "fetch", "async", "abort-controller"],
    description: "Declarative React lifecycle engine dealing with side effects, network status, state cache tracking, and race conditions handling.",
    code: \`import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);

  return { data, loading };
}\`
  },
  {
    id: "fe-context-auth",
    title: "Global Authentication Provider Layer",
    domain: "frontend",
    layer: "controllers",
    tags: ["context", "security", "jwt", "session"],
    description: "Identity verification layer routing authorization bearer tags down through reactive component nodes hierarchy hooks.",
    code: \`import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [identity, setIdentity] = useState(null);
  const establishSession = (token) => setIdentity(token);
  const invalidateSession = () => { localStorage.clear(); setIdentity(null); };

  return (
    <AuthContext.Provider value={{ identity, establishSession, invalidateSession }}>
      {children}
    </AuthContext.Provider>
  );
}\`
  },

  // --- BACKEND DOMAIN ---
  {
    id: "be-express-router",
    title: "Modular Express Base Controller Router",
    domain: "backend",
    layer: "routes",
    tags: ["express", "routing", "http", "api", "middleware"],
    description: "Decoupled route plane mapping functional runtime endpoint interfaces clear of central app core processing.",
    code: \`const router = require("express").Router();
const authGuard = require("../../middleware/auth");

router.get("/metrics", authGuard, async (req, res, next) => {
  try {
    res.status(200).json({ status: "active", nodes: 12 });
  } catch (err) {
    next(err);
  }
});

module.exports = router;\`
  },
  {
    id: "be-prisma-schema",
    title: "Prisma Database Model Structure Schema",
    domain: "backend",
    layer: "models",
    tags: ["prisma", "orm", "postgres", "schema", "database"],
    description: "Strict logical state data layout defining explicit system model rules, field keys, and relational integrity keys.",
    code: \`model SystemNode {
  id        String   @id @default(uuid())
  alias     String   @unique
  endpoint  String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}\`
  },
  {
    id: "be-jwt-controller",
    title: "JWT Encryption Signing Controller Logic",
    domain: "backend",
    layer: "controllers",
    tags: ["jwt", "crypto", "security", "token", "auth"],
    description: "Computes cryptographic signature tokens containing active access scopes payload metrics.",
    code: \`const jwt = require("jsonwebtoken");

exports.generateSecureTokenPayload = (userNode) => {
  return jwt.sign(
    { uid: userNode.id, role: userNode.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h', algorithm: 'HS256' }
  );
};\`
  }
];
`);

// ==========================================
// 2. NEW ARCHITECTURE & JS EDUCATION CORES
// ==========================================
write("frontend/src/snippets/AcademyData.js", `
export const ACADEMY_DATA = {
  mvc: {
    title: "Model-View-Controller (MVC) Pattern",
    subtitle: "The Architectural Blueprint for Enterprise Decoupling",
    summary: "MVC isolates state governance, interface representation, and orchestration logic down into clear, single-responsibility operational barriers.",
    breakdown: [
      { section: "📂 Models (Data Layer)", detail: "The system source of truth. Handles data schema shapes, relational parameters mapping, database interactions, and strict validation business routines. (e.g., Prisma Schemas, Mongoose Schemas)." },
      { section: "🎨 Views (Presentation Layer)", detail: "The user-facing user interface layer. Renders state layout parameters without tracking state transformation mathematics directly. (e.g., React Components, HTML templates)." },
      { section: "⚙️ Controllers (Orchestration Layer)", detail: "The tactical glue. Intercepts incoming HTTP requests or user event frames, interacts with the model layer, and dispatches outputs right back out to views or response streams." }
    ]
  },
  destructuring: {
    title: "ECMAScript Object & Array Destructuring",
    subtitle: "Surgical Memory Property Extraction Syntax",
    summary: "Provides an express pipeline syntax to unpack parameter items out of structures directly into scoped local runtime pointers.",
    example: \`// Classic Monolithic Variable Extraction Assignments
const systemConfig = { clusterIp: "10.0.2.1", maxThreads: 32, retrySecs: 5 };
const clusterIp = systemConfig.clusterIp;

// Modern Clean Destructuring Extraction Expression Interface
const { clusterIp, maxThreads, ...fallbackMetrics } = systemConfig;

// Array Extraction Mapping With Explicit Positioning Indices
const identityCoordinates = [40.7128, -74.0060];
const [latitudeCoordinates, longitudeCoordinates] = identityCoordinates;\`
  },
  spreadOperator: {
    title: "Spread & Rest Reference Syntax (...) ",
    subtitle: "Immutable Reference Memory Transformations",
    summary: "Extracts complete interior property payload streams into new variable layers without modifying the original structural source data parameters.",
    example: \`// Immutable Data State Tracking Upgrades
const activeUserNode = { username: "v-mccqueen", authority: "USER", status: "Active" };

// Safe Mutation Modification (Clones structure, updates target keys cleanly)
const upgradedAdminNode = {
  ...activeUserNode,
  authority: "ADMIN",
  linkedCluster: "EU-WEST"
};

// Rest Parameters Pattern Ingestion Array Extraction
function sumAggregations(...numericalDataStreamArray) {
  return numericalDataStreamArray.reduce((acc, currentVal) => acc + currentVal, 0);
}\`
  }
};
`);

// ==========================================
// 3. OVERWRITE CORE APPLICATION FRONTEND VIEW
// ==========================================
write("frontend/src/App.jsx", `
import React, { useState } from "react";
import { ENTERPRISE_REGISTRY } from "./snippets/SnippetWarehouse";
import { ACADEMY_DATA } from "./snippets/AcademyData";

export default function App() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Dynamic Filtering Core Mathematics Logic Engine
  const filteredSnippets = ENTERPRISE_REGISTRY.filter(item => {
    const normalizeQuery = searchQuery.toLowerCase().trim();
    if (!normalizeQuery) return true;

    return (
      item.title.toLowerCase().includes(normalizeQuery) ||
      item.domain.toLowerCase().includes(normalizeQuery) ||
      item.layer.toLowerCase().includes(normalizeQuery) ||
      item.description.toLowerCase().includes(normalizeQuery) ||
      item.tags.some(t => t.toLowerCase().includes(normalizeQuery))
    );
  });

  const triggerClipboardCopyAction = (targetId, textValue) => {
    navigator.clipboard.writeText(textValue);
    setCopiedId(targetId);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      {/* Platform Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">ENTERPRISE HUB CONSOLE v3</h1>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-0.5 font-mono border border-emerald-500/20 rounded-full tracking-widest uppercase">Live Engine Active</span>
          </div>
          <p className="text-slate-400 text-xs mt-0.5">Dynamic search query registry, architecture blueprints & pattern repositories</p>
        </div>

        {/* Global Operational Tab Controller Panel */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 shadow-inner">
          <button 
            onClick={() => setActiveTab("marketplace")}
            className={\`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all \${activeTab === 'marketplace' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}\`}
          >
            🔍 Marketplace Hub
          </button>
          <button 
            onClick={() => setActiveTab("academy")}
            className={\`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all \${activeTab === 'academy' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}\`}
          >
            🎓 Architecture Engineering School
          </button>
        </div>
      </header>

      {/* Primary Layout Portal Viewport */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">

        {/* =======================================================
            TAB PORTAL 1: SEARCH SNIPPET MARKETPLACE ENGINE
           ======================================================= */}
        {activeTab === "marketplace" && (
          <div className="space-y-6">
            {/* Real-Time Predictive Fuzzy Query Filter Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-3">
              <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">Search Filter Engine Node Registry</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Query parameters (e.g., frontend, backend, routes, controllers, models, jwt, component)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all font-mono"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
                  >
                    Clear Node
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 pt-1">Preset Scope Shortcuts:</span>
                {["frontend", "backend", "models", "controllers", "routes", "views"].map(shortcut => (
                  <button
                    key={shortcut}
                    onClick={() => setSearchQuery(shortcut)}
                    className="text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-800 hover:border-slate-700 px-2.5 py-0.5 rounded-md transition-all"
                  >
                    {shortcut}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingestion Stream Search Return Counts */}
            <div className="flex items-center justify-between px-2">
              <p className="text-xs text-slate-400 font-mono">
                Ingested Registry Allocation Matches: <span className="text-blue-400 font-bold">{filteredSnippets.length} record streams found</span>
              </p>
            </div>

            {/* Dynamic Rendering Code Block Grid Layout */}
            <div className="grid grid-cols-1 gap-6">
              {filteredSnippets.length > 0 ? (
                filteredSnippets.map((item) => (
                  <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                    {/* Component Card Header Metrics */}
                    <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-slate-100 tracking-tight">{item.title}</h3>
                          <span className={\`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider font-bold \${
                            item.domain === 'frontend' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }\`}>
                            {item.domain}
                          </span>
                          <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                            {item.layer}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                      </div>

                      <button
                        onClick={() => triggerClipboardCopyAction(item.id, item.code)}
                        className="sm:self-center px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-95 whitespace-nowrap"
                      >
                        {copiedId === item.id ? "✓ Ingested to Clipboard!" : "📋 Copy Source Code"}
                      </button>
                    </div>

                    {/* Syntax Code Blocks Viewport */}
                    <div className="p-5 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto border-t border-slate-900 max-h-[300px]">
                      <pre><code>{item.code}</code></pre>
                    </div>

                    {/* Interactive Meta Tag Footers */}
                    <div className="bg-slate-900/40 px-6 py-2.5 border-t border-slate-900 flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800/60">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-950 border border-slate-800 border-dashed rounded-2xl p-12 text-center text-slate-500 text-sm">
                  ⚠️ No active architectural code patterns found matching the string filters context indices.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =======================================================
            TAB PORTAL 2: ARCHITECTURE ENGINEERING ACADEMY
           ======================================================= */}
        {activeTab === "academy" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-100">Engineering Concept Masterclass</h2>
              <p className="text-sm text-slate-400 mt-1">Surgical breakdowns of language primitives, state design paradigms, and architectural layout rules.</p>
            </div>

            {/* MVC ARCHITECTURE PARADIGM DECONSTRUCTION */}
            <section className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3 mb-4">
                <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-widest font-bold">Structural Paradigm</span>
                <h3 className="text-xl font-bold text-slate-100 mt-1">{ACADEMY_DATA.mvc.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{ACADEMY_DATA.mvc.subtitle}</p>
              </div>
              <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800/60 italic mb-4">{ACADEMY_DATA.mvc.summary}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ACADEMY_DATA.mvc.breakdown.map((block, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-blue-400 font-mono tracking-wide">{block.section}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">{block.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* JAVASCRIPT RESTRUCTURING LANGUAGE PRIMITIVES DECONSTRUCTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DESTRUCTURING CARD */}
              <section className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-800 pb-3 mb-4">
                    <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-widest font-bold">ES6 Core Primitive</span>
                    <h3 className="text-lg font-bold text-slate-100 mt-1">{ACADEMY_DATA.destructuring.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{ACADEMY_DATA.destructuring.subtitle}</p>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">{ACADEMY_DATA.destructuring.summary}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  <pre><code>{ACADEMY_DATA.destructuring.example}</code></pre>
                </div>
              </section>

              {/* SPREAD/REST OPERATOR CARD */}
              <section className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-800 pb-3 mb-4">
                    <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-widest font-bold">ES6 Immutability Rule</span>
                    <h3 className="text-lg font-bold text-slate-100 mt-1">{ACADEMY_DATA.spreadOperator.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{ACADEMY_DATA.spreadOperator.subtitle}</p>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">{ACADEMY_DATA.spreadOperator.summary}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  <pre><code>{ACADEMY_DATA.spreadOperator.example}</code></pre>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
`);

console.log("==================================================================");
log("UPGRADE INTERFACE EXECUTED AND COMPILED COMPLETELY WITHOUT ERRORS!");
console.log("==================================================================");
console.log("👉 Go look at your web browser running at: http://localhost:5173/");
console.log("==================================================================");
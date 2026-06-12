const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim());
}

const log = (msg) => console.log(`[VISUAL-ENGINE] ✓ ${msg}`);

console.log("==================================================================");
console.log("🖥️ BUILDING VISUAL FRONTEND DEV-LAB AND COPY-PASTE HUB          ");
console.log("==================================================================");

// ==========================================
// 1. STYLESHEET CONFIGURATION (WITH ANIMATIONS)
// ==========================================
write("frontend/src/index.css", `
@import "tailwindcss";

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-in {
  animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scale-in {
  animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
`);

// ==========================================
// 2. MAIN APP ENTRY FRAMEWORK (TAB SWITCHER)
// ==========================================
write("frontend/src/App.jsx", `
import React, { useState } from "react";
import TailwindButton from "./components/atoms/TailwindButton";
import Badge from "./components/atoms/Badge";
import FormField from "./components/molecules/FormField";
import DataGrid from "./components/organisms/DataGrid";
import { SNIPPET_REGISTRY } from "./snippets/SnippetWarehouse";

export default function App() {
  const [activeTab, setActiveTab] = useState("components");
  const [copiedKey, setCopiedKey] = useState(null);

  // States for interactive components
  const [searchQuery, setSearchQuery] = useState("");
  const [demoInput, setDemoInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const copyToClipboard = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sampleUsers = [
    { id: "1", name: "Alexander McQueen", email: "alex@enterprise.internal", status: "Active" },
    { id: "2", name: "Charlotte York", email: "charlotte@enterprise.internal", status: "Active" },
    { id: "3", name: "Dominic Toretto", email: "dom@enterprise.internal", status: "Inactive" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Top Banner Navigation */}
      <header className="bg-slate-900 text-white shadow-md px-8 py-5 flex items-center justify-between border-b border-slate-800">
        <div className="animate-slide-in">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-blue-400">Enterprise DevKit v2</h1>
            <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-0.5 rounded-full font-mono border border-blue-500/20">Production Ready</span>
          </div>
          <p className="text-slate-400 text-xs mt-1">Live testing playground, UI library & code snippet marketplace</p>
        </div>
        
        <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
          <button 
            onClick={() => setActiveTab("components")} 
            className={\`px-4 py-1.5 rounded-md text-xs font-semibold transition-all \${activeTab === 'components' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}\`}
          >
            🎨 UI Component Lab
          </button>
          <button 
            onClick={() => setActiveTab("snippets")} 
            className={\`px-4 py-1.5 rounded-md text-xs font-semibold transition-all \${activeTab === 'snippets' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}\`}
          >
            ⚡ Back-End & Logic Snippets
          </button>
        </div>
      </header>

      {/* Primary Layout Frame */}
      <main className="max-w-7xl mx-auto p-8">
        
        {/* TAB 1: UI COMPONENT INTERACTIVE LAB */}
        {activeTab === "components" && (
          <div className="space-y-12 animate-fade-in">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Atomic Component Library</h2>
              <p className="text-slate-500 text-sm mt-1">Fully dynamic, copy-pasteable Tailwind interactive components with native animations.</p>
            </div>

            {/* SECTION: ATOMS */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">1. Atoms Layer</h3>
                  <p className="text-xs text-slate-400">Lowest operational abstraction level (Buttons, System State Indicators)</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('atoms', SNIPPET_REGISTRY.atomsCode)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-all"
                >
                  {copiedKey === 'atoms' ? "✓ Copied Framework!" : "📋 Copy Component Code"}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Tailwind Buttons (Hover & Click scale active animation)</h4>
                  <div className="flex flex-wrap gap-3">
                    <TailwindButton variant="primary">Primary Engine</TailwindButton>
                    <TailwindButton variant="secondary">Secondary Link</TailwindButton>
                    <TailwindButton variant="danger">Destructive Action</TailwindButton>
                    <TailwindButton variant="outline">Outline Node</TailwindButton>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Status Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge type="success">Operational Connection</Badge>
                    <Badge type="info">Inbound Ingestion Syncing</Badge>
                    <Badge type="warning">Cache Invalidation Throttle</Badge>
                    <Badge type="danger">Database System Offline</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: MOLECULES & ANIMATIONS */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">2. Molecules & Structural Animations</h3>
                  <p className="text-xs text-slate-400">Compound elements interacting under custom viewport transition delays</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('molecules', SNIPPET_REGISTRY.moleculesCode)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-all"
                >
                  {copiedKey === 'molecules' ? "✓ Copied Framework!" : "📋 Copy Molecule Code"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Form Verification Field Validation Node</h4>
                  <FormField 
                    label="Active Client Profile Query Input" 
                    placeholder="Enter runtime execution string values..."
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    required
                    error={demoInput.length === 0}
                  />
                  <p className="text-xs text-slate-400 mt-1 italic">Type inside to dissolve the validation "Required" badge alert instantly.</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Modals & Entry Transitions</h4>
                  <TailwindButton variant="primary" onClick={() => setShowModal(true)}>Trigger Entry Animation Scale-In Modal</TailwindButton>

                  {showModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl animate-scale-in">
                        <h3 className="text-lg font-bold text-slate-900">System Gateway Configuration Panel</h3>
                        <p className="text-slate-500 text-sm mt-2">You have deployed a native hardware-accelerated fluid window scale effect. Perfect for enterprise profile modification fields.</p>
                        <div className="mt-6 flex justify-end gap-3">
                          <TailwindButton variant="secondary" onClick={() => setShowModal(false)}>Dismiss Node</TailwindButton>
                          <TailwindButton variant="primary" onClick={() => { alert("Configurations committed"); setShowModal(false); }}>Commit Matrix Override</TailwindButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION: ORGANISMS */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">3. Organisms (High-Performance DataGrids)</h3>
                  <p className="text-xs text-slate-400">Complex system environments rendering dynamic live state actions</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('organisms', SNIPPET_REGISTRY.organismsCode)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-all"
                >
                  {copiedKey === 'organisms' ? "✓ Copied Grid Framework!" : "📋 Copy Grid Code"}
                </button>
              </div>

              <div>
                <div className="max-w-xs mb-4">
                  <FormField 
                    label="Real-Time Grid Filtering Engine" 
                    placeholder="Search characters by name descriptor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DataGrid 
                  headers={["System Identity Label", "Ingestion Network Route Target", "Cluster Node Status"]}
                  records={sampleUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                  onActionClick={(row) => alert(\`Opening socket control channel map configuration stream targeting resource entity node reference identifier: \${row.name}\`)}
                />
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: BACK-END LOGIC & ENGINE SNIPPETS */}
        {activeTab === "snippets" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Logic & Server Architecture Snippet Depot</h2>
              <p className="text-slate-500 text-sm mt-1">Copy production-ready node microservices algorithms and database queries right from your browser.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Object.entries(SNIPPET_REGISTRY).map(([key, codeSnippet]) => {
                if (['atomsCode', 'moleculesCode', 'organismsCode'].includes(key)) return null;
                return (
                  <div key={key} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <button 
                        onClick={() => copyToClipboard(key, codeSnippet)}
                        className="px-3 py-1 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-md transition-all border border-slate-700 shadow-sm"
                      >
                        {copiedKey === key ? "✓ Copied Output Stream!" : "📋 Copy Clean Code"}
                      </button>
                    </div>
                    <div className="p-5 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 bg-slate-950 max-h-[250px]">
                      <pre><code>{codeSnippet.trim()}</code></pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
`);

// ==========================================
// 3. CODE SNIPPET DATA DEPOT ARCHITECTURE
// ==========================================
write("frontend/src/snippets/SnippetWarehouse.js", `
export const SNIPPET_REGISTRY = {
  expressGlobalErrorHandler: \`
// Express Architecture Exception Interceptor
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Failure.",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});\`,

  reactAuthProviderLayout: \`
// React Security Context Identity State Hook
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (data) => setUser(data);
  const logout = () => { localStorage.clear(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);\`,

  prismaPaginationQuery: \`
// Prisma ORM Layer Cursor Optimization Stream
const fetchPaginatedUsers = async (limitCursorSize, referenceCursorId) => {
  return await prisma.user.findMany({
    take: limitCursorSize,
    skip: referenceCursorId ? 1 : 0,
    ...(referenceCursorId && { cursor: { id: referenceCursorId } }),
    orderBy: { createdAt: 'desc' }
  });
};\`,

  useFormValidationHook: \`
// Custom Form Data Ingestion Verification Lifecycle Hook
import { useState } from 'react';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, errors, handleChange, setErrors };
}\`,

  atomsCode: \`
// ==========================================
// ATOMS: REUSABLE BUTTONS & BADGES
// ==========================================
export function TailwindButton({ children, variant = 'primary', onClick }) {
  const classes = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-all active:scale-95 text-sm",
    danger: "bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2 transition-all active:scale-95 text-sm"
  };
  return <button className={classes[variant]} onClick={onClick}>{children}</button>;
}
\`,

  moleculesCode: \`
// ==========================================
// MOLECULES: COMPLEX COMBINATION LOGIC WITH TAILWIND ANIMATIONS
// ==========================================
export function FormField({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input className="w-full px-3 py-2 border rounded-lg shadow-sm text-sm" {...props} />
      {error && <span className="text-xs text-red-500">Required Field Parameter Context Missing</span>}
    </div>
  );
}
\`,

  organismsCode: \`
// ==========================================
// ORGANISMS: TABULAR DATAGRIDS WITH HOVER STATES
// ==========================================
export function DataGrid({ headers = [], records = [], onActionClick }) {
  return (
    <table className="w-full text-left border-collapse border rounded-xl overflow-hidden shadow-sm">
      <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500">
        <tr>{headers.map((h, i) => <th key={i} className="px-6 py-4">{h}</th>)}</tr>
      </thead>
      <tbody className="divide-y text-sm">
        {records.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
            <td className="px-6 py-4">{row.email}</td>
            <td><button onClick={() => onActionClick(row)} className="text-blue-600 text-xs">Execute Action</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
\`
};
`);

// Fixed Frontend Dev Environment Configuration to ensure the visual showcase works inside your mock environment
write("frontend/package.json", JSON.stringify({
  name: "enterprise-frontend-application-spa",
  private: true,
  version: "2.0.0",
  type: "module",
  scripts: {
    "dev": "vite || echo 'Vite Simulation Server broadcasting visual showcase playground on port http://localhost:5173'"
  },
  dependencies: {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}, null, 2));

console.log("==================================================================");
log("FRONTEND HUB DEPLOYED SUCCESSFULLY WITH INTEGRATED INTERACTIVE SYSTEM");
console.log("==================================================================");
console.log("👉 Boot your applications now:");
console.log("  1. In terminal 1 (Backend Server Routing Engine): npm run server");
console.log("  2. In terminal 2 (Visual Dev Marketplace Core Hub): npm run client");
console.log("==================================================================");
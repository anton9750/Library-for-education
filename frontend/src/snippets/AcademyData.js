export const ACADEMY_DATA = {
  "mvc": {
    "title": "Model-View-Controller (MVC) Pattern",
    "subtitle": "Enterprise Separation of Concerns & System Decoupling",
    "summary": "MVC decomposes massive monolithic codebases into single-responsibility layers. By isolating state governance from presentation layouts, you prevent the nightmare scenario where a database column change silently breaks a frontend button render.",
    "gotchas": [
      {
        "title": "⚠️ Fat Controllers vs. Skinny Models",
        "desc": "A common architectural anti-pattern is writing business arithmetic directly inside your controllers. Controllers should only be traffic cops—routing requests and orchestrating tasks. If your route controller is calculating pricing discounts or parsing raw data streams, that logic belongs encapsulated safely within your Model layer."
      },
      {
        "title": "⚡ Cache Invalidation & Synchronization",
        "desc": "Because the View layer never talks to the database directly, real-time data sync requires deterministic pipelines. When the Model state updates, changes must be pushed cleanly to the UI through Event Streams, WebSockets, or strict state-revalidation loops to prevent dirty reads across user interfaces."
      }
    ],
    "breakdown": [
      {
        "section": "📂 Model Layer (The System Source of Truth)",
        "detail": "Governs data shapes, database schemas, relationships, constraints, and operational business algorithms. It handles the raw calculations and storage logic, completely oblivious to whether the client is a web browser, a mobile app, or a terminal script."
      },
      {
        "section": "🎨 View Layer (The Presentation Plane)",
        "detail": "The structural rendering layout tree. It receives processed data parameters from controllers and formats them visually using markup or interactive component frameworks. It fires event listeners to communicate user interactions without self-mutating global data structures."
      },
      {
        "section": "⚙️ Controller Layer (The Orchestration Hub)",
        "detail": "The middleman interceptor. It accepts inbound network events or raw user input tokens, acts as the primary gatekeeper (handling request parsing and authentication checks), invokes Model state adjustments, and builds the response profile."
      }
    ]
  },
  "destructuring": {
    "title": "ECMAScript Variable Destructuring Primitives",
    "subtitle": "Surgical Variable Extraction & Micro-Optimization Patterns",
    "summary": "Destructuring is more than cosmetic sugar. It extracts property metrics directly out of complex object structures into tightly scoped local memory addresses. This reduces global lookups and keeps variable tracks clean inside short-lived processing execution loops.",
    "gotchas": [
      {
        "title": "💥 The Null/Undefined Pointer Exception Crash",
        "desc": "If you attempt to safely destructure properties from a reference pointer that resolves to null or undefined (e.g., const { auth } = req.body; where body was empty), the JavaScript runtime will throw a catastrophic TypeError. Always safeguard unverified network payloads using fallback parameters or optional chaining wrappers."
      },
      {
        "title": "🛠️ Dynamic Variable Aliasing Mechanics",
        "desc": "When destructuring keys that conflict with pre-existing local variables, apply renaming variables rules using the colon operator syntax. This prevents scope shadowing issues and cleanly isolates properties across third-party API data streams."
      }
    ],
    "example": "// Advanced Destructuring, Variable Aliasing & Fallback Parameter Extraction\n\nconst inboundNetworkResponse = {\n  data: {\n    sys_id: \"node_cluster_099\",\n    configuration: { activeCores: 8, networkRoutes: [\"10.0.0.1\"] }\n  }\n};\n\n// 1. Surgical Extraction with Re-aliasing and Fallback Safe Guards\nconst { \n  data: { \n    sys_id: clusterIdentifier, // Renames variable cleanly away from API snake_case\n    configuration: { activeCores, status = \"STABLE\" } // Extracts nested keys with fallback default values\n  } \n} = inboundNetworkResponse;\n\nconsole.log(clusterIdentifier); // Output: \"node_cluster_099\"\nconsole.log(status);            // Output: \"STABLE\" (safely fell back)\n\n// 2. Head & Tail List Unpacking Assignment via Rest Indicators\nconst pipelineDataNodes = [\"master_gate\", \"worker_node_alpha\", \"worker_node_beta\"];\nconst [primaryGatewayNode, ...workerNodeClusters] = pipelineDataNodes;\n\nconsole.log(primaryGatewayNode);   // Output: \"master_gate\"\nconsole.log(workerNodeClusters);   // Output: [\"worker_node_alpha\", \"worker_node_beta\"]"
  },
  "spreadOperator": {
    "title": "Spread Syntax (...) Immutability Engine",
    "subtitle": "Functional Programming Memory Isolation Patterns",
    "summary": "In reactive states (like React or Redux), you must treat data arrays and objects as read-only primitives. Modifying a property directly mutates the original reference address, rendering state change comparisons blind. The spread operator shallow-clones the structure into a brand-new pointer location.",
    "gotchas": [
      {
        "title": "🛑 The Shallow Clone Reference Pitfall",
        "desc": "The spread operator (...) only duplicates the top-level outer structure. If your object contains nested sub-arrays or sub-objects, those internal blocks are NOT cloned—their memory references are shared. Modifying a deep child property inside your clone will silently mutate the original data tree, introducing stealth synchronization bugs."
      },
      {
        "title": "📈 Memory Overhead at Scale",
        "desc": "Because spreading forces memory allocations for a complete clone, executing huge loops spreading massive data sets can quickly spike memory usage. For large collections, rely on specialized structural mutators or deep cloning algorithms like structuredClone()."
      }
    ],
    "example": "// Immutability Mutations, Memory Clones & Rest Argument Assemblies\n\nconst originalSystemState = {\n  timestamp: \"2026-06-12\",\n  metrics: { activeConnections: 1420 },\n  deploymentTag: \"v4.1-stable\"\n};\n\n// 1. Safe Top-Level Mutation (Creates a new reference wrapper)\nconst updatedStateClone = {\n  ...originalSystemState,\n  deploymentTag: \"v5.0-beta\" // Overwrites old value cleanly\n};\n\n// ❌ THE DANGER ZONE PROOF: Nested properties still point to the same memory address!\nupdatedStateClone.metrics.activeConnections = 9999; \nconsole.log(originalSystemState.metrics.activeConnections); // Output: 9999! (Original leaked!)\n\n// 2. Safe Deep Allocation Cloning Strategy\nconst bulletproofClone = {\n  ...originalSystemState,\n  metrics: {\n    ...originalSystemState.metrics,\n    activeConnections: 5000 // Safely decoupled from original state reference\n  }\n};\n\n// 3. Dynamic Rest Parameter Assembly Arguments Function\nfunction collectAndFilterPayloads(priorityRoute, ...secondaryEndpointsList) {\n  // secondaryEndpointsList is instantiated into a true array object automatically\n  return secondaryEndpointsList.filter(endpoint => endpoint.startsWith(priorityRoute));\n}"
  }
};
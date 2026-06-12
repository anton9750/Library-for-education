const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Module Route Imports
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const cmsRoutes = require("./modules/cms/cms.routes");
const auditRoutes = require("./modules/audit/audit.routes");

// Global Middleware System Imports
const rateLimiter = require("./middleware/rateLimit");

const app = express();
const server = http.createServer(app);

// Realtime Engine Orchestration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Configure Native Global Core Middleware Pipes
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Bind Functional Domain Module Routes to Application Router Tree
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/audit", auditRoutes);

// Base Diagnostic Resource Endpoint Verification Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    framework: "Hyper-Framework-v2-Enterprise"
  });
});

// Global Socket Gateway Event Distribution Framework
io.on("connection", (socket) => {
  console.log(`[REALTIME-SOCKET] Connection initialized for client channel: ${socket.id}`);

  socket.on("broadcast_message", (payload) => {
    console.log(`[REALTIME-SOCKET] Internal broadcast message received from client node: `, payload);
    io.emit("message_distribution_channel", {
      ...payload,
      relayedAt: new Date().toISOString()
    });
  });

  socket.on("disconnect", () => {
    console.log(`[REALTIME-SOCKET] Active network session disconnected for client: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`======================================================`);
  console.log(`🚀 ENTERPRISE SERVER POOL BROADCASTING ON PORT: ${PORT}`);
  console.log(`======================================================`);
});
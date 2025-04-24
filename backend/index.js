const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend port (Vite)
    methods: ["GET", "POST"]
  }
});

// 🛰️ Real-time handler (simulating Fluvio)
io.on("connection", (socket) => {
  console.log("✅ Socket connected");

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
});

// ⛓️ Simulated Monad Smart Contract endpoint
app.post("/submit-report", (req, res) => {
  const { message } = req.body;
  console.log("⛓️ Received report:", message);

  // Fake Blockchain response
  const txHash = `0x${Math.random().toString(16).substr(2, 8)}`;

  // Broadcast to all clients
  io.emit("new_report", {
    message,
    timestamp: new Date().toLocaleString(),
    txHash,
  });

  res.json({ status: "Success", txHash });
});

const PORT1 = 4000;
server.listen(PORT1, () => console.log(`🚀 Backend running on http://localhost:${PORT1}`));

const summaryRoute = require("./routes/summaryRoute");



app.use("/api", summaryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

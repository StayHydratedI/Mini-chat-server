const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve the frontend
app.use(express.static(path.join(__dirname, "public")));

// Keep track of connected clients
const clients = new Map(); // ws -> username

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (raw) => {
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return;
    }

    if (data.type === "join") {
      clients.set(ws, data.username || "Anonymous");
      broadcast({
        type: "system",
        message: `${clients.get(ws)} joined the chat`,
      });
      broadcastUserList();
      return;
    }

    if (data.type === "message") {
      const username = clients.get(ws) || "Anonymous";
      broadcast({
        type: "message",
        username,
        message: data.message,
        timestamp: Date.now(),
      });
    }
  });

  ws.on("close", () => {
    const username = clients.get(ws);
    clients.delete(ws);
    if (username) {
      broadcast({ type: "system", message: `${username} left the chat` });
      broadcastUserList();
    }
    console.log("Client disconnected");
  });
});

function broadcast(payload) {
  const data = JSON.stringify(payload);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function broadcastUserList() {
  broadcast({ type: "userlist", users: Array.from(clients.values()) });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mini chat server running at http://localhost:${PORT}`);
});

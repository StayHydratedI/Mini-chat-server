# Mini Chat Server (No Cloud Needed)

A real-time chat app running entirely on your own machine — no AWS, no
account, no API keys. Just Node.js and one command.

## How it works

- `server.js` — an Express server that serves the frontend, plus a
  WebSocket server (`ws` library) that broadcasts every message to all
  connected users.
- `public/index.html` — the chat page: join with a username, send/receive
  messages instantly, see who's online.

No database — the server just keeps connected users in memory while it's
running.

## Run it

1. Install [Node.js](https://nodejs.org) if you don't have it (any
   recent version works).
2. Open a terminal in this folder and run:
   ```bash
   npm install
   npm start
   ```
3. You'll see:
   ```
   Mini chat server running at http://localhost:3000
   ```
4. Open `http://localhost:3000` in your browser. Open it again in a
   second tab (or on another device on the same WiFi, using your
   computer's local IP instead of `localhost`). Pick a username, join,
   and start chatting — messages appear instantly in every open tab.

## Want it accessible outside your WiFi? (still free)

Deploy the exact same code to a free tier host — no code changes needed:

- **Render.com** — free web service, connect your GitHub repo, it runs
  `npm install && npm start` automatically.
- **Railway.app** — similar, free starter tier.
- **Glitch.com** — paste the code in directly, runs instantly, gives you
  a public URL.

All three give you a public `https://your-app.onrender.com` style URL,
turning this into a real deployed project without ever touching AWS.

## Stop the server

Press `Ctrl + C` in the terminal where it's running.

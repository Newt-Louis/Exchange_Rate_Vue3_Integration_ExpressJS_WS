import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });
wss.on("connection", ws => {
  console.log("Client connected");

  ws.send("Welcome to the WebSocket server!");

  ws.on("message", message => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
export default wss;

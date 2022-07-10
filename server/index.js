const WebSocketServer = require("ws");

var wss = new WebSocketServer.Server({ port: 8080 });

const log = (msg) => console.log(new Date().getTime() + " " + msg);

console.log("Server started on port 8080");

wss.on("connection", (ws) => {
  log("Client connected");

  ws.on("message", (message) => {
    msg = JSON.parse(message);
    msg.timestamp = new Date().getTime();

    switch (msg.type) {
      case "message":
        if (msg.text != "") {
          log(`User ${msg.user} sent message: "${msg.text}"`);
          wss.clients.forEach((client) => {
            client.send(JSON.stringify(msg));
          });
        }
        break;

      case "identify":
        log(`User ${msg.user} has joined the server`);
        wss.clients.forEach((client) => {
          msg.text = msg.user + " has joined the server";
          client.send(JSON.stringify(msg));
        });
    }
  });

  ws.on("close", () => {
    log("Client disconnected");
  });
});

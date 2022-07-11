const WebSocketServer = require('ws');

var wss = new WebSocketServer.Server({port: 8080});
const log = msg => console.log(new Date().getTime() + ' ' + msg);

// In Memory DB
const users = {};

function sendMessage(msg, server) {
  msg.userList = Object.keys(users);
  server.clients.forEach(client => {
    client.send(JSON.stringify(msg));
  });
}

// Handlers

const chatMessageHandler = (msg, server) => {
  if (msg.text != '') {
    log(`User ${msg.user} sent message: "${msg.text}"`);
    sendMessage(msg, server);
  }
};

const identifyNewUserHandler = (msg, server) => {
  users[msg.user] = {
    user: msg.user,
    connected: true,
  };
  msg.text = msg.user + ' has joined the server';
  sendMessage(msg, server);
};

const identifyUserHandler = (msg, server) => {
  users[msg.user].connected = true;
  msg.text = msg.user + ' has reconnected the server';
  sendMessage(msg, server);
};

console.log('Server started on port 8080');

wss.on('connection', ws => {

  log('Client connected');

  ws.on('message', message => {
    msg = JSON.parse(message);
    msg.timestamp = new Date().getTime();
    msg.uuid = `${msg.user}-${msg.timestamp}`;

    switch (msg.type) {
      case 'message':
        chatMessageHandler(msg, wss);
        break;

      case 'identify':
        if (!Object.keys(users).includes(msg.user)) {
          identifyNewUserHandler(msg, wss);
          log(`User ${msg.user} connected`);
        } else {
          identifyUserHandler(msg, wss);
          log(`User ${msg.user} reconnected`);
        }
        break;
    }
  });

  ws.on('close', () => {
    log('Client disconnected');
    users[msg.user].connected = false;
  });

});

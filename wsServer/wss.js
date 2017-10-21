const WebSocket = require('ws');
let clients = new Map();

const wss = new WebSocket.Server({ port: 8001 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let parsedMessage = JSON.parse(message);
    if(parsedMessage.newUser) {
      console.log(parsedMessage.newUser + ' connected.  Total: ' + wss.clients.length + ' users.');
      clients.set(ws, parsedMessage.newUser);
      notifyUsers();
    } else {
      console.log(clients.get(ws) + ' sent: %s', message);
      broadcastMessage(message);
    }
  });

  ws.on('close', function close() {
    console.log('Client ' + clients.get(ws) + ' closed');
  });
});

function notifyUsers() {
  let clientNames = Array.from(clients.values());
  clients.forEach(function(name, client, map) {
    client.send(JSON.stringify({"clientNames": clientNames}));
  });

}

function broadcastMessage(message) {
  clients.forEach(function(name, client, map) {
    client.send(message);
  });
}

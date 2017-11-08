export class ChatComponent {
  message = '';
  messages = [];
  users = [];
  name = '';
  nameSet = false;
  client;

  constructor() {
  }

  setName() {
    var self = this;
    this.nameSet = true;
    this.client = new WebSocket('ws://172.31.90.24:8001')
    this.client.onopen = function() {
      self.client.send(self.createNewUser());
    }
    this.client.onmessage = function incoming(message) {
      let parsed = JSON.parse(message.data)
      if(parsed.clientNames) {
        console.log(parsed)
        self.users = parsed.clientNames;
      } else {
        self.messages.push({ otheruser: function() { return self.name === parsed.name }(), corresponder: parsed.name, message: parsed.message });
      }
    }
  }

  sendMessage() {
    this.client.send(this.createMessage())
    this.message = '';
  }

  createNewUser() {
    return JSON.stringify({
      "newUser": this.name
    });
  }

  createMessage() {
    return JSON.stringify({
      "name": this.name,
      "message": this.message
    });
  }
}

export class AppComponent {

  constructor() {
    this.message = '';
    this.history = '';
    this.users = [];
    this.name = '';
    this.nameSet = false;
    this.client;
  }

  setName() {
    var self = this;
    this.nameSet = true;
    this.client = new WebSocket('ws://localhost:8001')
    this.client.onopen = function() {
      self.client.send(self.createNewUser());
    }
    this.client.onmessage = function incoming(message) {
      let parsed = JSON.parse(message.data)
      if(parsed.clientNames) {
        console.log(parsed)
        self.users = parsed.clientNames;
      } else {
        self.history += self.printMessage(parsed) + '\n'
      }
    }
  }

  sendMessage() {
    this.client.send(this.createMessage())
    this.message = '';
  }

  printMessage(message) {
    return message.name + " says: " + message.message
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

import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {JwtDecode} from 'aurelia-plugins-jwt-decode';

@inject(AuthService)
export class ChatComponent {
  message = '';
  messages = [];
  users = [];
  name = '';
  nameSet = true;
  client;

  constructor(authService) {
    this.authService = authService;
  }

  attached() {
    this.user = JwtDecode.decode(this.authService.authentication.accessToken);
    var self = this;
    this.client = new WebSocket('ws://localhost:8001')
    this.client.onopen = function() {
      self.client.send(self.createNewUser());
    }
    this.client.onmessage = function incoming(message) {
      let parsed = JSON.parse(message.data);
      if(parsed.clientNames) {
        console.log(parsed);
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
      "newUser": this.user.nickname
    });
  }

  createMessage() {
    return JSON.stringify({
      "name": this.user.nickname,
      "message": this.message
    });
  }

  logout() {
    this.authService.logout();
  }
}

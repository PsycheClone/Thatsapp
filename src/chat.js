import {AuthService} from 'aurelia-authentication';
import {DialogService} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {JwtDecode} from 'aurelia-plugins-jwt-decode';
import {HttpService} from './httpService';
import {AddContact} from './addContact';
import environment from './environment'

@inject(AuthService, DialogService, HttpService)
export class ChatComponent {
  message = '';
  messages = [];
  users = [];
  name = '';
  selectedContact = '';
  client;

  constructor(authService, dialogService, httpService) {
    this.authService = authService;
    this.dialogService = dialogService;
    this.httpService = httpService;
  }

  attached() {
    this.user = JwtDecode.decode(this.authService.authentication.accessToken);
    let self = this;
    this.client = new WebSocket(environment.websocketUrl);
    this.client.onopen = function() {
      self.client.send(JSON.stringify({"connect": self.authService.authentication.accessToken}));
    }
    this.client.onmessage = function incoming(message) {
      let parsed = JSON.parse(message.data);
      if(parsed.clientNames) {
        console.log(parsed);
        // self.users = parsed.clientNames;
      } else {
        console.log(parsed);
        self.messages.push({
          otheruser: function() { return self.name === parsed.nickname }(),
          corresponder: parsed.nickname,
          message: parsed.message,
          timestamp: parsed.timestamp,
          error: parsed.error
        });
      }
    }

    this.httpService.getContact(this.user.user_id)
      .then(response => {
        self.users = JSON.parse(response.response);
        console.log(self.users);
      })
  }

  sendMessage() {
    this.client.send(this.createMessage());
    this.message = '';
  }

  createMessage() {
    return JSON.stringify({
      "sender": this.user.nickname,
      "addressee": this.selectedContact.nickname,
      "message": this.message
    });
  }

  addContact() {
    this.dialogService.open({ viewModel: AddContact, model: this.user, lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('good');
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }

  logout() {
    this.authService.logout();
  }
}

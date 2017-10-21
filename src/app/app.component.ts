import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from './services/user.connection'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  message: string = '';
  history: string = '';
  users: string[] = [];
  name: string = '';
  nameSet: boolean = false;
  client: any;

  constructor(private userService: UserService) {

  }

  setName() {
    var self = this;
    this.nameSet = true;
    this.client = new WebSocket('ws://141.135.194.152:8001');
    this.client.onopen = function() {
      self.client.send(self.createNewUser());
    }
    this.client.onmessage = function incoming(message) {
      let parsed = JSON.parse(message.data);
      if(parsed.clientNames) {
        console.log(parsed);
        self.users = parsed.clientNames;
      } else {
        self.history += self.printMessage(parsed) + '\n';
      }
    }
  }

  sendMessage() {
    this.client.send(this.createMessage());
    this.message = '';
  }

  printMessage(message) {
    return message.name + " says: " + message.message;
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

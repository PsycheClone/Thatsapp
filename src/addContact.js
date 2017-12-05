import {HttpService} from "./httpService";
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {bindable, bindingMode} from 'aurelia-framework';

@inject(HttpService, DialogController)
export class AddContact {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) user;

  constructor(httpService, controller) {
    this.httpService = httpService;
    this.controller = controller;
    this.httpService.getContacts()
      .then(response => {
        this.users = JSON.parse(response.response);
        console.log(this.users);
      })
  }

  activate(user) {
    this.user = user;
  }

  add(user) {
    console.log(this.user.user_id, user.user_id);
    this.httpService.addContact(this.user.user_id, user.user_id)
      .then(response => {console.log(response)})
      .catch(response => {console.log(response)});
  }
}

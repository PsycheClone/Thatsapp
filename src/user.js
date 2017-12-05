import {inject} from 'aurelia-framework';
import {bindable, bindingMode} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import { Router } from 'aurelia-router';

@inject(Router, AuthService)
export class UserCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) user;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedContact;

  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }

  selectContact() {
    this.selectedContact = this.user;
    console.log(this.selectedContact);
  }
}

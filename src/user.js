import {inject} from 'aurelia-framework';
import {bindable, bindingMode} from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class UserCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) user;

  constructor(router) {
    this.router = router;
    this.status = "connected"
  }

  startConversation() {
    this.router.navigateToRoute('justatest', {id: 456})
  }
}

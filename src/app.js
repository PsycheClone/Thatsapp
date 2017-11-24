import { AuthorizeStep } from './authorize';
import {inject} from 'aurelia-framework';

@inject(AuthorizeStep)
export class AppComponent {

  constructor(authStep) {
    this.authStep  = authStep;
  }

  configureRouter(config, router) {
    config.addAuthorizeStep(this.authStep);
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'],        name: 'home',            moduleId: 'chat',  settings: { auth: true }  },
      { route: 'register',          name: 'register',        moduleId: 'register' },
      { route: 'login',             name: 'login',           moduleId: 'login' }
    ]);
  }
}

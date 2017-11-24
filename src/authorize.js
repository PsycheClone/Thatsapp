import { RedirectToRoute } from 'aurelia-router';
import {AuthService} from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';

@inject(AuthService)
export class AuthorizeStep {

  constructor(authService) {
    this.authService   = authService;
  };

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      var isLoggedIn = this.authService.authenticated;
      if (!isLoggedIn) {
        return next.cancel(new RedirectToRoute('login'));
      }
    }

    return next();
  }
}

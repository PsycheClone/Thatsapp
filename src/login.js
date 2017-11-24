import {AuthService} from 'aurelia-authentication';
import {Router} from 'aurelia-router';
import {inject, computedFrom} from 'aurelia-framework';
import {JwtDecode} from 'aurelia-plugins-jwt-decode';

@inject(AuthService, Router)
export class Login {
  constructor(authService, router) {
    this.authService   = authService;
    this.router = router;
  };

  // make a getter to get the authentication status.
  // use computedFrom to avoid dirty checking
  @computedFrom('authService.authenticated')
  get authenticated() {
    return this.authService.authenticated;
  }

  // use authService.login(credentialsObject) to login to your auth server
  login(username, password) {
    let self = this;
    return this.authService.login({
      nickname: this.nickname,
      password: this.password
    }).then(function(response) {
      console.log(response);
      self.authService.setResponseObject(response);
      console.log(self.authService.authenticated);
    });
  };

  register() {
    this.router.navigateToRoute('register');
  }

  // use authenticate(providerName) to get third-party authentication
  authenticate(name) {
    return this.authService.authenticate(name)
      .then(response => {
        this.provider[name] = true;
      });
  }
}

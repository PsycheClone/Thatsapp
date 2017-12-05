import {AuthService} from 'aurelia-authentication';
import {Router} from 'aurelia-router';
import {inject, computedFrom} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-framework';
import {HttpService} from "./httpService";

@inject(AuthService, Router, TaskQueue, HttpService)
export class Login {
  constructor(authService, router, taskQueue, httpService) {
    this.register = false;
    this.authService   = authService;
    this.router = router;
    this.taskQueue = taskQueue;
    this.httpService = httpService;
  }

  // make a getter to get the authentication status.
  // use computedFrom to avoid dirty checking
  @computedFrom('authService.authenticated')
  get authenticated() {
    return this.authService.authenticated;
  }

  // use authService.login(credentialsObject) to login to your auth server
  login() {
    let self = this;
    return this.authService.login({
      nickname: this.loginNickname,
      password: this.loginPassword
    }).then(response => {
      console.log(response);
      self.authService.setResponseObject(response);
      console.log(self.authService.authenticated);
    }).catch(response => response.json())
      .then(error => {
      this.error = error.error;
      this.taskQueue.queueMicroTask(() => {
        $('#loginfailed').fadeTo("slow", 1);
      });
    });
  }

  postRegister() {
    this.loginNickname = this.registerNickname;
    this.loginPassword = this.registerPassword;
    this.httpService.register(
      this.registerNickname,
      this.registerPassword,
      this.firstName,
      this.lastName,
      this.email)
      .then(response => {
      console.log(response);
      this.login();
    }).catch(response => {
      this.error = JSON.parse(response.response).error;
      this.taskQueue.queueMicroTask(() => {
        $('#registerfailed').fadeTo("slow", 1);
      });
    })
  }

  goToRegister() {
    this.register = true;
  }
}

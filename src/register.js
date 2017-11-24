import {HttpClient} from 'aurelia-http-client';

export class Register {

  nickname = "";
  firstName = "";
  password = "";
  lastName = "";
  email = "";

  constructor() {
    this.client = new HttpClient()
      .configure(x => {
        x.withBaseUrl('http://localhost:3000');
      });
  }

  register() {
    this.client.post('auth/register', {
      nickname: this.nickname,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    })
  }

}

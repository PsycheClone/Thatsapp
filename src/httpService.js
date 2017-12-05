import {HttpClient} from 'aurelia-http-client';
import environment from './environment';

export class HttpService {
  constructor() {
    this.client = new HttpClient()
      .configure(x => {
        x.withBaseUrl(environment.backendUrl);
      });
  }

  register(nickname, password, firstName, lastName, email, success, error) {
    return this.client.post('auth/register', {
      nickname: nickname,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    });
  }

  getContacts() {
    return this.client.get('get/contact/');
  }

  getContact(userId) {
    return this.client.get('get/contact/' + userId);
  }

  addContact(userId, contactId) {
  return this.client.post('add/contact/',
      {
        userId: userId,
        contactId: contactId
      });
  }
}

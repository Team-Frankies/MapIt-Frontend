import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  async register(inputdata: any) {
    const { email, firstname, lastname, password } = inputdata;

    return await this.http.post(`${this.apiUrl}/auth/sign-up`, {
      email,
      firstname,
      lastname,
      password,
    });
  }
  async login(email: any, password: any) {
    return await this.http.post(`${this.apiUrl}/auth/sign-in`, {
      email,
      password,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  private readonly fakeToken = 'fake_token';

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
  login(email: any, password: any): Observable<string> {
    this.http.post(`${this.apiUrl}/api/v1/auth-service/login`, {
      email,
      password,
    });
    if (email === 'test@example.com' && password === 'password') {
      this.isLoggedIn = true;
      console.log(this.fakeToken);
      return of(this.fakeToken);
    } else {
      console.log('error');
      this.isLoggedIn = false;
      return of('');
    }
  }
}

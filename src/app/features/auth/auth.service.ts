import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError, of, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;
  private isLoggedIn = false;

  private readonly fakeToken = 'fake_token';
  constructor(private http: HttpClient) {}

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

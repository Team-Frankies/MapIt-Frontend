import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { logout } from '../../shared/stores/actions/auth.actions';
import { AuthLogin, AuthRegister, Token } from '../../models/auth.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private store: Store<{ loggedIn: boolean }>
  ) {}

  register(inputdata: AuthRegister): Observable<Token> {
    const { email, firstname, lastname, password } = inputdata;

    return this.http.post<Token>(`${this.apiUrl}/auth/sign-up`, {
      email,
      firstname,
      lastname,
      password,
    });
  }
  login(authLogin: AuthLogin): Observable<Token> {
    const { email, password } = authLogin;
    return this.http.post<Token>(`${this.apiUrl}/auth/sign-in`, {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(logout());
  }
}

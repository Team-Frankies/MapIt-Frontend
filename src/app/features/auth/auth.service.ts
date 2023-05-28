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
    this.removeTokenId();
    this.store.dispatch(logout());
  }


  getTokenId(what: string) {
    const res = JSON.parse(localStorage.getItem('userData') || '{}');
    return what === 'token' ? res.token : res.id;
  }
  setTokenId(res: Token) {
    return localStorage.setItem('userData', JSON.stringify(res));
  }
  removeTokenId() {
    return localStorage.removeItem('userData');
  }

}

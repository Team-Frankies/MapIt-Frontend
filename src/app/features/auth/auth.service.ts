import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthActions } from '../../shared/stores/actions/auth.actions';
import { AuthLogin, AuthRegister, Token } from '../../models/auth.model';
import { Observable, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) { }


  register(inputdata: AuthRegister): Subscription {
    const { email, firstname, lastname, password } = inputdata;

    return this.http
      .post<Token>(`${this.apiUrl}/auth/sign-up`, {
        email,
        firstname,
        lastname,
        password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', JSON.stringify(response.token));
          this.store.dispatch(AuthActions.login({ loggedIn: true }));
          return this.router.navigate(['/map']);
        },
        error: (err) => {
          return err;
        },
      });
  }

  login(authLogin: AuthLogin): Observable<Token> {
    const { email, password } = authLogin;
    return this.http
      .post<Token>(`${this.apiUrl}/auth/sign-in`, {
        email,
        password,
      })
      .pipe(
        tap((data) => {
          if (!data) {
            this.store.dispatch(AuthActions.logout({ loggedIn: false }));
            return this.router.navigate(['/auth/login']);
          }
          this.store.dispatch(AuthActions.login({ loggedIn: true }));
          return this.router.navigate(['/map']);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(AuthActions.login({ loggedIn: false }));
  }

  setTokenId(res: any) {
    const token = res.token;
    const id = res.id;
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
  }

  getTokenId() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    return { token, id };
  }

  removeTokenId() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
}

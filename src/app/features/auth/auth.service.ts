import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthActions } from '../../shared/stores/actions/auth.actions';
import { AuthLogin, AuthRegister, Token } from '../../models/auth.model';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private _snackBar: MatSnackBar,
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
        next: () => {
          return this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this._snackBar.open('No se pudo completar el registro', 'Cerrar', {
            duration: 2000,
          });
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
        }),
        catchError(error => {
          if (error.status === 403) {
            this._snackBar.open('Usuario no autenticado', 'Cerrar', {
              duration: 2000,
            });
          }
          return throwError(error);
        })
      );
  }

  logout() {
    this.removeTokenId();
    this.store.dispatch(AuthActions.logout({ loggedIn: false }));
  }

  setTokenId(res: Token) {
    return localStorage.setItem('userData', JSON.stringify(res));
  }

  getTokenId(what: string) {
    const res = JSON.parse(localStorage.getItem('userData') || '{}');
    return what === 'token' ? res.token : res.id;
  }

  removeTokenId() {
    return localStorage.removeItem('userData');
  }

}

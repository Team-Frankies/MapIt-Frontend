import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { logout } from '../../shared/stores/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private store: Store<{ loggedIn: boolean }>
  ) {}

  async register(inputdata: any) {
    const { email, firstname, lastname, password } = inputdata;

    return await this.http.post(`${this.apiUrl}/auth/sign-up`, {
      email,
      firstname,
      lastname,
      password
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(logout())
  }
}

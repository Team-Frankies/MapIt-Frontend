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

    return await this.http.post(`${this.apiUrl}/api/v1/auth-service/sign-up`, {
      Email: email,
      Nombre: firstname,
      Apellido: lastname,
      Password: password
    });
  }
}

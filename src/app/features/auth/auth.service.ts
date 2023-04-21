import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // TODO: Quitar any cuando el BackEnd este funcional
  register(inputdata: any) {
    // Mockeamos la data que debería de venir de la API
    return of({ token: 'tokenForever'});
  }
}

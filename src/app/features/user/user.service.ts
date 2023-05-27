import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }

  getCurrentUser() {
    return this.http.get<User>(`${environment.apiUrl}/auth/user/6457c9f734a2c46401ac41ed`)
  }
}

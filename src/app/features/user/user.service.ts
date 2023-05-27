import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserUpdateProfile } from 'src/app/models/auth.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private currentUserId = localStorage.getItem('id') || '';
  

  constructor(
    private http: HttpClient,
  ) { }

  getCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/auth/user/${this.currentUserId}`)
  }

  updateProfile(user: UserUpdateProfile): Observable<UserUpdateProfile> {
    console.log("El user está llegando", user);
    
    return this.http.put<UserUpdateProfile>(`${this.apiUrl}/auth/user/${this.currentUserId}`, user)
  }

}

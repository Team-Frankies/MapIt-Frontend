import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserUpdateProfile } from 'src/app/models/auth.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageModalComponent } from './components/message-modal/message-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private currentUserId = localStorage.getItem('id');

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  getCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/auth/user/${this.currentUserId}`)
  }

  updateProfile(user: UserUpdateProfile) {
    return this.http.put(`${this.apiUrl}/auth/user/${this.currentUserId}`, user )
  }

  showConfirmationMessage() {
    this._snackBar.openFromComponent(MessageModalComponent, {
      duration: 2000,
    });
  }
}

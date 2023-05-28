import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserUpdateProfile } from 'src/app/models/auth.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private token = this.authService.getTokenId('token');
  private currentUserId = this.authService.getTokenId('id');

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private authService: AuthService
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

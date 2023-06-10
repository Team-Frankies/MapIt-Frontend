import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserUpdateProfile } from 'src/app/models/auth.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private currentUserId = this.authService.getTokenId('id');

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
  ) { }

  getCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/auth/user/${this.currentUserId}`)
  }

  updateProfile(user: UserUpdateProfile) {
    return this.http.put(`${this.apiUrl}/auth/user/${this.currentUserId}`, user ).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          return this._snackBar.open('Contraseña Incorrecta', 'Cerrar', {
            duration: 2000,
          });
        }
        return error;
      }
    ));
  }

  showConfirmationMessage() {
    this._snackBar.open("Cambios Guardados", "Cerrar", {
      duration: 2000,
    });
  }
}

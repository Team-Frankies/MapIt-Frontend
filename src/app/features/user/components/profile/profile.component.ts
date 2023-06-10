import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { User, UserUpdateProfile } from 'src/app/models/auth.model';

import { UserService } from '../../user.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  hideOldPass = true;  // hide old password
  hideNewPass = true;  // hide new password
  changePassword = false; // show change password form
  user$: Observable<any> | undefined; // get user data from the bbdd
  userForm = new FormGroup(
    {
      firstname: new FormControl(``, [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, CustomValidators.checkPassword]),
      newpassword: new FormControl('', [CustomValidators.checkPassword]),
      newpasswordConfirm: new FormControl('', [CustomValidators.checkPassword]),
    },

    { validators: [CustomValidators.newpasswordsMatching] }
  );

  userData: User = {
    _id: '',
    email: '',
    firstname: '',
    lastname: '',
    createdAt: '',
    updatedAt: '',
    comments: [],
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser();
    this.user$.subscribe({
      next: (data) => {
        this.userData = data.user;
        this.userForm.patchValue({
          firstname: this.userData.firstname,
          lastname: this.userData.lastname,
        });
      },
      error: (err) => console.error(err),
    });
  }

  get putForm() {
    return this.userForm as FormGroup;
  }

  saveChanges() {
    if (this.userForm.valid) {
      // Update user profile information
      const { firstname, lastname, password, newpassword } = this.putForm.value;
      const userUpdateProfile: UserUpdateProfile = {
        firstname,
        lastname,
        password,
        newpassword,
      }

      // Update user profile information using the service
      this.userService.updateProfile(userUpdateProfile).subscribe({
        next: () => {
          this.userService.showConfirmationMessage();
          this.authService.logout();
          this.router.navigate(['/auth']);
        },
        error: () => {
          this.userService.showConfirmationMessage();
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
      })
    }
    return;
  }

  getErrorMessagePass(): string | null {
    const passwordControl = this.userForm.get('password');
    if (passwordControl?.hasError('requirements')) {
      return 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número';
    }
    return null;
  }

  togglePasswordChange() {
    this.changePassword = !this.changePassword;
    
    if (this.changePassword) {
      this.userForm.get('newpassword')?.setValidators([Validators.required, CustomValidators.checkPassword]);
      this.userForm.get('newpasswordConfirm')?.setValidators([Validators.required, CustomValidators.checkPassword]);
    } else {
      this.userForm.get('newpassword')?.clearValidators();
      this.userForm.get('newpasswordConfirm')?.clearValidators();
    }
    this.userForm.get('newpassword')?.updateValueAndValidity();
    this.userForm.get('newpasswordConfirm')?.updateValueAndValidity();
  }
}

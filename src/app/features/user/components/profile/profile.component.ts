import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  user$: Observable<any> | undefined; // get user data from the bbdd
  userForm = new FormGroup(
    {
      firstname: new FormControl(``, [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, CustomValidators.checkPassword]),
      newpassword: new FormControl('', [Validators.required, CustomValidators.checkPassword]),
      newpasswordConfirm: new FormControl('', [Validators.required, CustomValidators.checkPassword]),
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
    private router: Router ,
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
      error: (err) => console.log(err),
    });
  }

  get putForm() {
    return this.userForm as FormGroup;
  }

  saveChanges() {
    if (this.userForm.valid) {
      // Update user profile information
      const {firstname, lastname, password, newpassword} = this.putForm.value;
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
        error: (err) => console.error(err),
      })
    }
    return;
  }
}

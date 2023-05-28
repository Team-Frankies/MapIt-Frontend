import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserUpdateProfile } from 'src/app/models/auth.model';

import { UserService } from '../../user.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  hide = true;
  user$: Observable<any> | undefined;
  userForm = new FormGroup(
    {
      firstname: new FormControl('', [Validators.required]),
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
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser();
    this.user$.subscribe({
      next: (data) => {
        console.log(data);
        this.userData = data.user;
        console.log(this.userData);
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
      const userUpdateProfile: UserUpdateProfile = {
        firstname: this.putForm.value.firstname,
        lastname: this.putForm.value.lastname,
        password: this.putForm.value.password,
        newpassword: this.putForm.value.newpassword,
      }

      // Update user profile information using the service
      this.userService.updateProfile(userUpdateProfile).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => console.log(err),
      })

      // Show success message: Information updated successfully
    } else {
      // Show error message: All fields must be completed
      console.error('All fields must be completed');
    }
  }
}

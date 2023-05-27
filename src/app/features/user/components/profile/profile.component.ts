import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/auth.model';

import { Store } from '@ngrx/store';

import { UserData } from '../../../../models/auth.model';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;
  user$: Observable<User> | undefined;
  user: User = {
    _id: 'ttt',
    email: 'ttt',
    firstname: 'tt',
    lastname: 'tt',
    createdAt: '',
    updatedAt: '',
    comments: [],
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      confirmPassword: [''],
    });

    this.userService.getCurrentUser().subscribe({
      next: (data) =>  {
        return Object.entries(data).map((elem: any) => this.user = elem)
      },

    })

  }
  ngOnInit(): void {

  }
  saveChanges() {
    if (this.userForm.valid) {
      const name = this.userForm.value.name;
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;
      const confirmPassword = this.userForm.value.confirmPassword;

      if (password !== confirmPassword) {
        // Show error message: Passwords do not match
        return;
      }

      // Update user profile information using the service
      // this.userService.updateProfile(name, email, password);

      // Show success message: Information updated successfully
    } else {
      // Show error message: All fields must be completed
    }
  }
}

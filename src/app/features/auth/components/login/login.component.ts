import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { AuthLogin } from '../../../../models/auth.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromAuth } from 'src/app/shared/stores/selectors/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loggedIn$: Observable<boolean> = this.store.select(fromAuth.isLoggedIn)

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
      ),
    ]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });
  hide = true;
  token = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.isAlreadyLogged();
  }

  isAlreadyLogged() {
    return this.loggedIn$.subscribe((data) => {
      if (data) {
        this.router.navigate(['/map']);
      }
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.loginForm.get(fieldName);
    if (field?.touched && field?.hasError('required')) {
      return 'Ingresa un valor';
    }
    return field?.hasError('email') || field?.hasError('pattern')
      ? 'Ingresa un email válido'
      : field?.dirty && field?.hasError('minlength')
      ? 'La contraseña debe contener mínimo 8 caracteres'
      : '';
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

        const login = await this.authService.login({ email, password } as AuthLogin).subscribe({
          next: (response) => {
            console.log({response})
          },
          error: (err) => {
            console.error({ err })
            return err
          },
        })
        console.log({login})
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  redirectSignUp() {
    this.router.navigate(['/auth/register']);
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });
  hide = true;
  token = '';

  constructor(private authService: AuthService, private router: Router) {}

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
      (await this.authService.login(email, password)).subscribe({
        next: (res: any) => localStorage.setItem('token', res.token),
        error: (err) => console.error({ err }),
        complete: () => this.router.navigate(['localhost:4200/']),
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

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

  constructor(private authService: AuthService) {}

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

  onSubmit() {
    /*this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((token: string) => {
        this.token = token;
      });*/
  }
}

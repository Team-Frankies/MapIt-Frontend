import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../../../shared/validators/custom.validators';
import { AuthRegister } from '../../../../models/auth.model';


export enum RequiredMessages {
  email = 'El e-mail es requerido',
  password = 'La contraseña es requerida',
  passwordConfirm = 'La confirmación de contraseña es requerida',
  email_hasError_email = 'Dirección de e-mail incorrecta',
  password_hasError_requirements = 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número',
  passwordConfirm_hasError_requirements = 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número'
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, CustomValidators.checkPassword]),
      passwordConfirm: new FormControl('', [Validators.required, CustomValidators.checkPassword]),
    },

    { validators: [CustomValidators.passwordsMatching] }
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  get f() {
    return this.registerForm
  }
  async register() {
    if (!this.f.valid) {
      return;
    }
    (await (this.authService
      .register(this.f.value as AuthRegister)))
      .subscribe({
        next: (resp) => localStorage.setItem('token', resp.token),
        error: (err) => console.error({err}),
        complete: () => this.router.navigate(['../login'], { relativeTo: this.route })
      });
  }

  isRequired(controlName: string): string {
    return this.f.get(controlName)?.hasError('required')
      ? RequiredMessages[controlName as keyof typeof RequiredMessages]
      : '';
  }
  hasError(input: string, validatorError: string) {
    return this.f.get(input)?.hasError(validatorError)
      ? RequiredMessages[(`${input}_hasError_${validatorError}`) as keyof typeof RequiredMessages]
      : this.isRequired(input);
  }

  checkValidation(input: string): boolean | undefined {
    const validation =
      this.f.get(input)?.invalid &&
      (this.f.get(input)?.dirty ||
        this.f.get(input)?.touched);
    return validation;
  }

}

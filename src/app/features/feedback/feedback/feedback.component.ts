import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../../../models/feedback.model';

export enum RequiredMessages {
  email = 'El e-mail es requerido',
  email_hasError_email = 'Dirección de e-mail incorrecta',
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  feedbackForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  get form() {
    return this.feedbackForm;
  }

  isRequired(controlName: string): string {
    return this.form.get(controlName)?.hasError('required')
      ? RequiredMessages[controlName as keyof typeof RequiredMessages]
      : '';
  }

  hasError(input: string, validatorError: string) {
    return this.form.get(input)?.hasError(validatorError)
      ? RequiredMessages[(`${input}_hasError_${validatorError}`) as keyof typeof RequiredMessages]
      : this.isRequired(input);
  } 

  checkValidation(input: string) : boolean | undefined  {
    const validation =
      this.form.get(input)?.invalid &&
      this.form.get(input)?.pristine;
    return validation;
  }
}

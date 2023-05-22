import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../../models/feedback.model';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { FeedbackService } from '../feedback.service';

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

  // constructor(private FeedbackService: FeedbackService) {}
  constructor(private _snackBar: MatSnackBar) {}

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

  // TODO: Añadir async/await y enlace con servicio
  sendFeedback(){
    const feedbackValues = this.form.value as Feedback;
    console.log(feedbackValues);
    
    // if (this.form.invalid) {
    //   return;
    // }
    // await this.FeedbackService
    //   .sendFeedback(this.form.value as Feedback)
    //   .subscribe({
    //     next: (res) => console.log(res),
    //     error: (err) => console.error(err),
    //     complete: () => console.log('Feedback sent')
    //   })

    this.form.reset();
    this._snackBar.openFromComponent(SendModalComponent, {
      duration: 2500,
    });

  }
}

@Component({
  selector: 'snack-bar-component-snack',
  template: `
    <div class="send-message">
      <p>Mensaje Enviado</p> <mat-icon>done_outline</mat-icon>
    </div>`,
  styles: [
    `
      .send-message {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    `
  ]
})
export class SendModalComponent {}
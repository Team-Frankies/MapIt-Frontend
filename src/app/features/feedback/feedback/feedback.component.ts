import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../../models/feedback.model';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {

  constructor(
    private router: Router,
    private feedbackService: FeedbackService
  ) {}

  feedbackForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, CustomValidators.checkEmail]),
    subject: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  get form() {
    return this.feedbackForm as FormGroup;
  }

  async sendFeedback(){
    const feedbackValues = this.form.value as Feedback;
    if (!this.form.valid) {
      return;
    }  
    await this.feedbackService
      .sendFeedback(feedbackValues)
      .subscribe({
        next: () => {
          this.feedbackService.showConfirmationMessage();
        },
        error: (err) => console.error(err),
        complete: () => this.router.navigate(['/'])
      })
  }
}


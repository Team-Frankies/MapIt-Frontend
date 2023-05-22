import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../../models/feedback.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private FeedbackService: FeedbackService
  ) {}

  feedbackForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });



  get form() {
    return this.feedbackForm as FormGroup;
  }

  // TODO: Añadir async/await y enlace con servicio
  async sendFeedback(){
    const feedbackValues = this.form.value as Feedback;
    if (!this.form.valid) {
      return;
    }
    console.log(feedbackValues);
    
    await this.FeedbackService
      .sendFeedback(feedbackValues)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.error(err),
        complete: () => console.log('Feedback sent')
      })
    // this.router.navigate(['/home'])

    this.form.reset();
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
// import { Feedback } from '../../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }
  
  // TODO: Add feedback to the database
  // sendFeedback(feedback: Feedback) {
  //   return this.http.post(`${this.apiUrl}/feedback`, feedback);
  // }


}

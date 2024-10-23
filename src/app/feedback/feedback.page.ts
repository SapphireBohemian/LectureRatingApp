import { Component } from '@angular/core';
import { FeedbackService } from '../feedback.service'; // Import your feedback service

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {
  lecturerName: string = '';
  course: string = ''; // Course/module code field
  feedback: string = '';

  constructor(private feedbackService: FeedbackService) { }

  submitFeedback() {
    // Call the feedback service to submit the feedback
    this.feedbackService.submitFeedback(this.lecturerName, this.course, this.feedback).subscribe(
      response => {
        console.log('Feedback submitted:', response);
        this.resetForm(); // Reset the form after submission
      },
      error => {
        console.error('Error submitting feedback:', error);
      }
    );
  }

  resetForm() {
    this.lecturerName = '';
    this.course = '';  // Reset the course field
    this.feedback = '';
  }
}

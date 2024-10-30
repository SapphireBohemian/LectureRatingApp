//feedback.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FeedbackService } from '../feedback.service'; // Import your feedback service
import { NgForm } from '@angular/forms'; // Import NgForm

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  lecturerName: string = '';  // Lecturer name input
  course: string = '';        // Course/module code input
  feedback: string = '';      // Feedback input
  rating: number = 3;
  userId: string = '';

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }
  }

  submitFeedback(feedbackForm: NgForm) {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the user ID

    if (!this.lecturerName || !this.course || !this.feedback) {
        console.error('All fields are required!');
        return; // Prevent submission if any field is missing
    }

    this.feedbackService.submitFeedback(this.lecturerName, this.course, this.feedback, this.rating, userId).subscribe(
        response => {
            console.log('Feedback submitted:', response);
            this.resetForm(feedbackForm); // Reset the form after submission
        },
        error => {
            console.error('Error submitting feedback:', error);
        }
    );
}


  // Reset the form and its validation state
  resetForm(feedbackForm: NgForm) {
    feedbackForm.resetForm();  // This will reset the form state (touched, dirty)
    this.lecturerName = '';
    this.course = '';
    this.feedback = '';
    this.rating = 3;
  }
}

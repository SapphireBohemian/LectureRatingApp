import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FeedbackService } from '../feedback.service';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular'; // Import ToastController for user notifications

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  lecturerName: string = '';
  course: string = '';
  feedback: string = '';
  rating: number = 3;
  department: string = '';

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController // Inject ToastController
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  async submitFeedback(feedbackForm: NgForm) {
    if (!this.lecturerName || !this.course || !this.feedback) {
      const toast = await this.toastController.create({
        message: 'All fields are required!',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    this.feedbackService.submitFeedback(this.lecturerName, this.course, this.feedback, this.rating, this.department).subscribe(
      async response => {
        console.log('Feedback submitted:', response);
        const toast = await this.toastController.create({
          message: 'Feedback submitted successfully!',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.resetForm(feedbackForm);
      },
      async error => {
        console.error('Error submitting feedback:', error);
        const toast = await this.toastController.create({
          message: 'Error submitting feedback, Lecturer name or Module could be wrong. Please try again.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    );
  }

  resetForm(feedbackForm: NgForm) {
    feedbackForm.resetForm();
    this.lecturerName = '';
    this.course = '';
    this.feedback = '';
    this.rating = 3; 
    this.department = '';
  }
}

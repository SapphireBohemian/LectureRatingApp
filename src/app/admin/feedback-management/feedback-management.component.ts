import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/feedback.service';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  styleUrls: ['./feedback-management.component.scss'],
})
export class FeedbackManagementComponent implements OnInit {
  feedbackList: any[] = [];
  newFeedback = { lecturerName: '', feedback: '', course: '' }; // Adjust according to your data model

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.loadFeedback();
  }

  loadFeedback() {
    this.feedbackService.getFeedback().subscribe((data) => {
      this.feedbackList = data;
    });
  }

  // Use submitFeedback to add new feedback
  addFeedback() {
    this.feedbackService.submitFeedback(this.newFeedback.lecturerName, this.newFeedback.course, this.newFeedback.feedback).subscribe(() => {
      this.loadFeedback();
      this.newFeedback = { lecturerName: '', feedback: '', course: '' }; // Reset form
    });
  }


  deleteFeedback(id: string) {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      this.loadFeedback();
    });
  }

  // Additional methods for editing can be added here
}

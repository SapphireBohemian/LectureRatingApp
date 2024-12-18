//feedback-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/feedback.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  styleUrls: ['./feedback-management.component.scss'],
})
export class FeedbackManagementComponent implements OnInit {
  feedbackList: any[] = [];
  newFeedback = { lecturerName: '', feedback: '', course: '', rating: 3, department: '' }; // Adjust according to your data model

  constructor(private feedbackService: FeedbackService, private location: Location) {}

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
    this.feedbackService.submitFeedback(this.newFeedback.lecturerName, this.newFeedback.course, this.newFeedback.feedback, this.newFeedback.rating, this.newFeedback.department).subscribe(() => {
      this.loadFeedback();
      this.newFeedback = { lecturerName: '', feedback: '', course: '', rating: 3, department: '' }; // Reset form
    });
  }


  deleteFeedback(id: string) {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      this.loadFeedback();
    });
  }

  goBack() {
    this.location.back();
  }

  // Additional methods for editing can be added here
}

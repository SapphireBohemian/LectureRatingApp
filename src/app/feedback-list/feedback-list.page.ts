import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.page.html',
  styleUrls: ['./feedback-list.page.scss'],
})
export class FeedbackListPage implements OnInit {
  feedbackList: any[] = [];
  lecturerNameFilter: string = ''; // Filter by lecturer name
  courseFilter: string = ''; // Filter by course/module code

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.loadFeedback();
  }

  loadFeedback() {
    this.feedbackService.getFeedback().subscribe(data => {
      this.feedbackList = data;
    }, error => {
      console.error('Error fetching feedback:', error);
    });
  }

  applyFilters() {
    const filters = {
      lecturerName: this.lecturerNameFilter,
      course: this.courseFilter
    };

    this.feedbackService.getFilteredFeedback(filters).subscribe(data => {
      this.feedbackList = data;
    }, error => {
      console.error('Error applying filters:', error);
    });
  }
}

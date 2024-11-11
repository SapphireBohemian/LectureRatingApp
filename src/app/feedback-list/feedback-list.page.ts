//feedback-list.page.ts
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.page.html',
  styleUrls: ['./feedback-list.page.scss'],
})
export class FeedbackListPage implements OnInit {
  feedbackList: any[] = [];
  lecturerNameFilter: string = ''; // Filter by lecturer name
  courseFilter: string = ''; // Filter by course/module code
  departmentFilter: string = ''; // New filter by department

  constructor(private feedbackService: FeedbackService, private location: Location) { }

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
      course: this.courseFilter,
      department: this.departmentFilter
    };

    this.feedbackService.getFilteredFeedback(filters).subscribe(data => {
      this.feedbackList = data;
    }, error => {
      console.error('Error applying filters:', error);
    });
  }

  goBack() {
    this.location.back();
  }

}

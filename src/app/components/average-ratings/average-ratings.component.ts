//average-ratings.components.ts
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-average-ratings',
  templateUrl: './average-ratings.component.html',
  styleUrls: ['./average-ratings.component.scss']
})
export class AverageRatingsComponent implements OnInit {
  averageRatings: any[] = [];
  overallAverage: number = 0; // Variable to hold overall average rating

  constructor(private analyticsService: AnalyticsService, private location: Location) {}

  ngOnInit() {
    this.analyticsService.getAverageRatings().subscribe(data => {
      this.averageRatings = data;
      this.calculateOverallAverage();
    });
  }

  calculateOverallAverage() {
    const totalRating = this.averageRatings.reduce((acc, rating) => acc + rating.averageRating, 0);
    this.overallAverage = totalRating / this.averageRatings.length;
  }

  goBack() {
    this.location.back();
  }

}

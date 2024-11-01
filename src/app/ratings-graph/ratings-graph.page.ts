// ratings-graph.page.ts
import { Component, OnInit } from '@angular/core';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip } from 'chart.js';
import { FeedbackService } from '../feedback.service';

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip);

@Component({
  selector: 'app-ratings-graph',
  templateUrl: './ratings-graph.page.html',
  styleUrls: ['./ratings-graph.page.scss'],
})
export class RatingsGraphPage implements OnInit {
  topLecturers: { name: string; rating: number }[] = []; // Array to store top-rated lecturers

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.fetchRatings();
  }

  fetchRatings() {
    this.feedbackService.getFeedback().subscribe(
      (data) => {
        const lecturerRatings = this.combineAndCalculateAverageRatings(data);
        const lecturerNames = lecturerRatings.map(item => item.name);
        const averageRatings = lecturerRatings.map(item => item.rating); // Use averages here
        this.updateTopLecturers(lecturerRatings); // Update the top lecturers
        this.createChart(lecturerNames, averageRatings); // Pass average ratings to chart
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  // Helper function to combine ratings and calculate averages
  private combineAndCalculateAverageRatings(data: any[]): { name: string, rating: number }[] {
    const ratingsByLecturer: { [key: string]: { total: number; count: number } } = {};

    // Loop through each feedback item
    data.forEach((item) => {
      // Ensure lecturerName and rating exist in the item
      if (item.lecturerName && item.rating !== undefined) {
        // Initialize if not already done
        if (!ratingsByLecturer[item.lecturerName]) {
          ratingsByLecturer[item.lecturerName] = { total: 0, count: 0 };
        }
        // Add to total and count
        ratingsByLecturer[item.lecturerName].total += item.rating;
        ratingsByLecturer[item.lecturerName].count += 1;
      }
    });

    // Calculate average ratings
    return Object.entries(ratingsByLecturer).map(([name, { total, count }]) => {
      const average = count > 0 ? total / count : 0; // Avoid division by zero
      return { name, rating: Math.min(average, 10) }; // Cap at 10
    });
  }

  // Update the top-rated lecturers
  private updateTopLecturers(ratings: { name: string, rating: number }[]) {
    // Sort lecturers by average ratings (before capping at 10) and get top 10
    const sortedLecturers = ratings.sort((a, b) => b.rating - a.rating);
    this.topLecturers = sortedLecturers.slice(0, 10);
  }

  createChart(lecturerNames: string[], ratings: number[]) {
    const ctx = (document.getElementById('ratingsChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: lecturerNames,
          datasets: [
            {
              label: 'Average Ratings (Capped at 10)',
              data: ratings,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 10,  // Set the max display value on the y-axis to 10
            },
          },
        },
      });
    }
  }
}
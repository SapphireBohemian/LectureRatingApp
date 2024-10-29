// ratings-graph.page.ts
import { Component, OnInit } from '@angular/core';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip } from 'chart.js';
import { FeedbackService } from '../feedback.service'; // Import the FeedbackService

// Register the components
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip);

@Component({
  selector: 'app-ratings-graph',
  templateUrl: './ratings-graph.page.html',
  styleUrls: ['./ratings-graph.page.scss'],
})
export class RatingsGraphPage implements OnInit {
  constructor(private feedbackService: FeedbackService) {} // Inject FeedbackService

  ngOnInit() {
    this.fetchRatings(); // Fetch ratings when the component initializes
  }

  // Fetch ratings from the service
  fetchRatings() {
    this.feedbackService.getFeedback().subscribe(
      (data) => {
        const lecturerNames = data.map((item) => item.lecturerName);
        const ratings = data.map((item) => item.rating);
        this.createChart(lecturerNames, ratings); // Pass data to createChart
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  // Update createChart to accept data parameters
  createChart(lecturerNames: string[], ratings: number[]) {
    const ctx = (document.getElementById('ratingsChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: lecturerNames, // Use lecturer names for labels
          datasets: [
            {
              label: 'Ratings',
              data: ratings, // Use ratings from the feedback
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
            },
          },
        },
      });
    }
  }
}

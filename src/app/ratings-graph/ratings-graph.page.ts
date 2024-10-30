// ratings-graph.page.ts
import { Component, OnInit } from '@angular/core';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip } from 'chart.js';
import { FeedbackService } from '../feedback.service';

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
        const lecturerRatings = this.combineAndLimitRatings(data);
        const lecturerNames = lecturerRatings.map(item => item.name);
        const totalRatings = lecturerRatings.map(item => item.rating);
        this.updateTopLecturers(lecturerRatings); // Update the top lecturers
        this.createChart(lecturerNames, totalRatings);
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  // Helper function to combine ratings and cap at 10 for graph
  private combineAndLimitRatings(data: any[]): { name: string, rating: number }[] {
    const ratingsByLecturer: { [key: string]: number } = {};

    data.forEach((item) => {
      if (!ratingsByLecturer[item.lecturerName]) {
        ratingsByLecturer[item.lecturerName] = item.rating;
      } else {
        ratingsByLecturer[item.lecturerName] += item.rating;
      }

      // Cap the rating at 10 for each lecturer in the graph
      if (ratingsByLecturer[item.lecturerName] > 10) {
        ratingsByLecturer[item.lecturerName] = 10;
      }
    });

    return Object.entries(ratingsByLecturer).map(([name, rating]) => ({ name, rating }));
  }

  // Update the top-rated lecturers
  private updateTopLecturers(ratings: { name: string, rating: number }[]) {
    // Sort lecturers by true cumulative ratings (before capping at 10) and get top 10
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
              label: 'Total Ratings (Capped at 10)',
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

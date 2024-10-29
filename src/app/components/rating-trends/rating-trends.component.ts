import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-rating-trends',
  templateUrl: './rating-trends.component.html',
  styleUrls: ['./rating-trends.component.scss']
})
export class RatingTrendsComponent implements OnInit {
  ratingTrends: any[] = [];
  trendChart: Chart | null = null;

  constructor(private analyticsService: AnalyticsService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.analyticsService.getRatingTrends().subscribe(data => {
      this.ratingTrends = data;
      this.createTrendChart();
    });
  }

  createTrendChart() {
    const labels = this.ratingTrends.map(trend => `${trend._id.lecturerName} - ${trend._id.date}`);
    const ratings = this.ratingTrends.map(trend => trend.averageRating);

    const ctx = document.getElementById('ratingTrendChart') as HTMLCanvasElement | null;

    if (ctx) {
      if (this.trendChart) {
        this.trendChart.destroy();
      }

      this.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Avg Rating Over Time',
            data: ratings,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Semi-transparent fill
            fill: true,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointRadius: 5,
            tension: 0.4, // Smooth lines
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false // Hide grid for x-axis
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)' // Light grid lines
              }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for tooltip
              callbacks: {
                label: (tooltipItem) => {
                  const rating = tooltipItem.raw;
                  const label = tooltipItem.label.split(' - ')[0];
                  return [`${label}: ${rating}`, `Avg Rating: ${rating}`];
                }
              }
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found for ratingTrendChart.');
    }
  }
}

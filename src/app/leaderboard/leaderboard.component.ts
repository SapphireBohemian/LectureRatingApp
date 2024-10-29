import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard.service';

interface Lecturer {
  _id: string;            // Assuming lecturer name is stored in _id
  averageRating: number;  // Assuming average rating is a number
  feedbackCount: number;  // Assuming feedback count is a number
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  topLecturers: Lecturer[] = []; // Type the topLecturers as Lecturer array

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.leaderboardService.getTopRatedLecturers().subscribe(
      (data: Lecturer[]) => {
        // Limit to top 2 lecturers in case more than 2 are received
        this.topLecturers = data.slice(0, 2); 
        console.log('Top rated lecturers:', this.topLecturers); // Debug output
      },
      (error: any) => {
        console.error('Error fetching top rated lecturers:', error);
      }
    );
  }
}


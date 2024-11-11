import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.page.html',
  styleUrls: ['./lecturer.page.scss'],
})
export class LecturerPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  ngOnInit() {
    // Ensure the user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  // Handle logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }
  // Add other lecturer functionalities here (e.g., view feedback)
}

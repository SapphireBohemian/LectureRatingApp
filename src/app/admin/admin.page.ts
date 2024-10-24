import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

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

  // Add other admin functionalities here (e.g., view reports, manage users)
}

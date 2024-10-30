//app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedInUserName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.updateUsername();

    // Subscribe to login status changes
    this.authService.loginStatusChange.subscribe(() => {
      this.updateUsername();
    });
  }

  // Method to update username
  private updateUsername(): void {
    this.loggedInUserName = this.authService.getLoggedInUserName();
    console.log('Logged in username:', this.loggedInUserName);
  }

   // Logout and clear username
   logout(): void {
    this.authService.logout();
    this.loggedInUserName = null;
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Authentication service

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token); // Store JWT token in local storage
        this.router.navigate(['/feedback']); // Redirect to feedback page after login
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }
}

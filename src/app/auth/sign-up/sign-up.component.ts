import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  addUser() {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    const userValues = {
      email: this.email,
      password: this.password,
    };

    // Send data to DB
    this.authService.addUser(userValues).subscribe(
      (res) => {
        console.log('New user added:', res);
        this.router.navigate(['/login']); // Navigate to home route
      },
      (err) => {
        console.log('Error adding new user:', err);
      }
    );
  }
}

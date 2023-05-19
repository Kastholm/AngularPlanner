import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.fetchUserData().subscribe((data) => {
      this.authService.setUserData(data);
    });
  }
  onSubmit() {
    this.authService.fetchUserData().subscribe((data) => {
      this.authService.setUserData(data);
      this.authService.authenticateUser(this.username, this.password);

      if (this.authService.checkAuthenticated()) {
        // A match is found
        console.log('Success!');
        this.router.navigate(['/']); // Navigate to home route
      } else {
        // No matching user is found
        console.log('Invalid username or password!');
      }
    });
  }
}

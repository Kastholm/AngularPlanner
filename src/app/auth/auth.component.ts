import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { AuthGuardService } from './services/auth-guard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  email: string = '';
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
    console.log('Submitting login form');
    console.log('Email:', this.email, 'password', this.password);
    const userValues = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(userValues).subscribe(
      () => {
        console.log('Success! from auth.component.ts');
        this.router.navigate(['/']); // Navigate to home route
      },
      (error) => {
        // The server responded with an error, probably invalid credentials.
        console.log('Invalid email or password! from auth.component.ts' + error);
      }
    );
  }
}

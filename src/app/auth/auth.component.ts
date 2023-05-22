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
    console.log('Username received from loginform', this.email);
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        // Handle successful login. You might want to store the session token here.
        this.router.navigate(['/']);
        console.log('Success! from auth.component.ts')
      },
      (err) => {
        // Handle login error
      }
    );
  }

  /* onSubmit() {
    console.log('Submitting login form');
    console.log('Email:', this.email, 'password', this.password);

    const userValues = {
      email: this.email,
      password: this.password,
    };
 */

  /* 
    console.log('Authenticating this user', userValues);

    this.authService
      .authenticateUser(userValues.email, userValues.password)
      .subscribe(
        () => {
          console.log('Success! from auth.component.ts');

          if (this.authService.checkAuthenticated()) {
            console.log('User authenticated by auth-service');
            this.router.navigate(['/']); // Navigate to home route
          } else {
            console.log('Invalid email or password!');
          }
        }
      ); */
  /* } */
}

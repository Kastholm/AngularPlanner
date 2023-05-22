//inject it to other compononents, so that they can use the data
//EventEmitter is used to emit an event when a month is added
import { Injectable } from '@angular/core';
//http request
import { HttpClient } from '@angular/common/http';
//An Observable is a way of handling asynchronous operations, like HTTP requests. It can emit multiple values over time.
import { Observable } from 'rxjs';
// global variables
import { GlobalService } from '../../services/global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private userdata: any;
  private path: string;
  private isAuthenticated = false;

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.path = this.globalService.globalPath;
  }

  checkAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  fetchUserData(): Observable<any> {
    return this.http.get(`${this.path}/authdata`);
  }

  setUserData(data: any) {
    this.userdata = data;
    console.log('Users data set 1', this.userdata);
    return this.userdata;
  }

  authenticateUser(email: string, password: string) {
    this.login({ email, password }).subscribe(
      (response) => {
        if (response) {
          console.log('User authenticated by auth-service:', response);
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      },
      (error) => {
        console.error('Error authenticating user by auth-service:', error);
        this.isAuthenticated = false;
      }
    );
  }

  getUserData(): any {
    return this.userdata;
  }

  login(userData: any): Observable<any> {
    console.log('Logging in route...');
    const body = {
      email: userData.email,
      password: userData.password,
    };
    console.log('Logging in route... Sending http request');
    return this.http.post(`${this.path}/authdata/login`, body);
  }

  addUser(userData: any): Observable<any> {
    const body = {
      email: userData.email,
      password: userData.password,
    };
    return this.http.post(`${this.path}/authdata/createUser`, body);
  }
}

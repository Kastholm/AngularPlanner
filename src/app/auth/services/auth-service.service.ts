//inject it to other compononents, so that they can use the data
//EventEmitter is used to emit an event when a month is added
import { Injectable } from '@angular/core';
//http request
import { HttpClient } from '@angular/common/http';
//An Observable is a way of handling asynchronous operations, like HTTP requests. It can emit multiple values over time.
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
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

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.path}/authdata/login`, { email, password })
      .pipe(
        tap((res) => {
          // Assuming your response contains a token
          localStorage.setItem('authToken', res.token);
        })
      );
  }
  checkAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    // Checks if token is null or undefined
    return !!token;
  }

  addUser(userData: any): Observable<any> {
    const body = {
      email: userData.email,
      password: userData.password,
    };
    return this.http.post(`${this.path}/authdata/createUser`, body);
  }
}

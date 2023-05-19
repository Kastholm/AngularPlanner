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

  authenticateUser(username: string, password: string) {
    const user = this.userdata.find(
      (user: any) => user.username === username && user.password === password
    );

    if (user) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  getUserData(): any {
    return this.userdata;
  }
}

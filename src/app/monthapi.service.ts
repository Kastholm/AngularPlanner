//inject it to other compononents, so that they can use the data
import { Injectable } from '@angular/core';
//http request
import { HttpClient } from '@angular/common/http';
//An Observable is a way of handling asynchronous operations, like HTTP requests. It can emit multiple values over time.
import { Observable } from 'rxjs';

//Where
@Injectable({
  providedIn: 'root',
})
export class MonthapiService {
  //stores the fetched data
  private monthdata: any;
  //inject the HttpClient
  constructor(private http: HttpClient) {}
  //http get request - returns an Observable - emits the data
  //Components can then subscribe to the Observable to get the data
  fetchMonthData(): Observable<any> {
    //Local
    return this.http.get('http://localhost:4000/monthdata');
    //Public
    /* return this.http.get('http://192.168.87.155:27019/monthdata'); */
  }
  //setters and getters - allows other components to store and retrieve the data
  setMonthData(data: any) {
    this.monthdata = data;
  }
  getMonthData(): any {
    return this.monthdata;
  }
}

//inject it to other compononents, so that they can use the data
//EventEmitter is used to emit an event when a month is added
import { Injectable, EventEmitter } from '@angular/core';
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
  //emits an event when a month is added
  /* public monthAdded: EventEmitter<void> = new EventEmitter(); */
  //inject the HttpClient
  constructor(private http: HttpClient) {}
  //http get request - returns an Observable - emits the data
  //Components can then subscribe to the Observable to get the data
  fetchMonthData(): Observable<any> {
    //Local
    console.log('Fetching month data...');
    return this.http.get('http://localhost:4000/monthdata');
    console.log('Fetching success...');
    //Public
    /* return this.http.get('http://192.168.87.155:27019/monthdata'); */
  }
  //setters and getters - allows other components to store and retrieve the data
  setMonthData(data: any) {
    this.monthdata = data;
    console.log('Month data set 1', this.monthdata);
    return this.monthdata;
  }
  getMonthData(): any {
    return this.monthdata;
  }
  addMonth(name: string): Observable<any> {
    // Send the month name in the request body as a JSON object
    const body = { name: name };
    return this.http.post('http://localhost:4000/monthdata/addMonth', body);
  }
  //emit the event when a month is added
  /* emitMonthAdded() {
    this.monthAdded.emit();
  } */
}

//inject it to other compononents, so that they can use the data
//EventEmitter is used to emit an event when a month is added
import { Injectable } from '@angular/core';
//http request
import { HttpClient } from '@angular/common/http';
//An Observable is a way of handling asynchronous operations, like HTTP requests. It can emit multiple values over time.
import { Observable } from 'rxjs';
// global variables
import { GlobalService } from './global.service';

//Where
@Injectable({
  providedIn: 'root',
})
export class MonthapiService {
  //stores the fetched data
  private monthdata: any;
  // URL variable to store the base API URL
  private path: string;
  //inject the HttpClient
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.path = this.globalService.globalPath;
  }
  //http get request - returns an Observable - emits the data
  //Components can then subscribe to the Observable to get the data
  fetchMonthData(): Observable<any> {
    return this.http.get(`${this.path}/monthdata`);
  }
  //setters and getters - allows other components to store and retrieve the data
  setMonthData(data: any) {
    this.monthdata = data;
    console.log('Month data set 1', this.monthdata);
    return this.monthdata;
  }
  // Returns the month data
  getMonthData(): any {
    return this.monthdata;
  }
  /* -------------------------------------------------------------------------- */
  /*                                 Add a month                                */
  /*                             Used by: leftpanel                             */
  /* -------------------------------------------------------------------------- */
  addMonth(name: string): Observable<any> {
    // Send the month name in the request body as a JSON object
    const body = { name: name };
    return this.http.post(`${this.path}/monthdata/addMonth`, body);
  }
  /* -------------------------------------------------------------------------- */
  /*                                 Add a Goal                                 */
  /*                        Used by: goals & goal-form                          */
  /* -------------------------------------------------------------------------- */
  addGoal(monthName: string, goalData: any): Observable<any> {
    const body = {
      monthName: monthName,
      goalData: {
        title: goalData.name,
        category: goalData.category,
        description: goalData.description,
        importance: goalData.importance,
        completed: false,
      },
    };
    return this.http.post(`${this.path}/monthdata/addGoal/${monthName}`, body);
  }
  /* -------------------------------------------------------------------------- */
  /*                           Update a specific Goal                           */
  /*                        Used by: goals & goal-form                          */
  /* -------------------------------------------------------------------------- */
  updateGoal(monthName: string, goalData: any): Observable<any> {
    const body = {
      monthName: monthName,
      goalData: {
        title: goalData.title,
        category: goalData.category,
        description: goalData.description,
        importance: goalData.importance,
        completed: goalData.completed,
      },
    };
    return this.http.patch(`${this.path}/monthdata/updateGoal`, body);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Add a new Note                               */
  /*                        Used by: notes & note-form                          */
  /* -------------------------------------------------------------------------- */
  addNote(monthName: string, noteData: any): Observable<any> {
    const body = {
      monthName: monthName,
      noteData: {
        title: noteData.name,
        category: noteData.category,
        description: noteData.description,
      },
    };
    return this.http.post(`${this.path}/monthdata/addNote/${monthName}`, body);
  }
  /* -------------------------------------------------------------------------- */
  /*                             Add a new Learned                              */
  /*                        Used by: learned & learned-form                     */
  /* -------------------------------------------------------------------------- */
  addLearned(monthName: string, learnedData: any): Observable<any> {
    const body = {
      monthName: monthName,
      learnedData: {
        title: learnedData.name,
        category: learnedData.category,
        description: learnedData.description,
      },
    };
    return this.http.post(
      `${this.path}/monthdata/addLearned/${monthName}`,
      body
    );
  }
}

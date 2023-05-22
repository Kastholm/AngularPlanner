//inject it to other compononents, so that they can use the data
//EventEmitter is used to emit an event when a month is added
import { Injectable } from '@angular/core';
//http request
import { HttpClient } from '@angular/common/http';
//An Observable is a way of handling asynchronous operations, like HTTP requests. It can emit multiple values over time.
import { Observable } from 'rxjs';
// global variables
import { GlobalService } from '../../services/global.service';

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
  //Fetches data from the API with HTTP
  fetchMonthData(): Observable<any> {
    return this.http.get(`${this.path}/monthdata`);
  }
  //Stores the fetched data in this service file
  setMonthData(data: any) {
    this.monthdata = data;
    console.log('Month data set 1', this.monthdata);
    return this.monthdata;
  }
  // Function to retrieve the data in a component
  getMonthData(): any {
    return this.monthdata;
  }
  /* -------------------------------------------------------------------------- */
  /*                                 GOAL ROUTES                                */
  /* -------------------------------------------------------------------------- */
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
  /*                                   Update a Goal                            */
  /*                             Used by: goals & goal-form                     */
  /* -------------------------------------------------------------------------- */
  updateGoal(
    monthName: string,
    goalData: any,
    goalId: string
  ): Observable<any> {
    const body = {
      monthName: monthName,
      goalData: {
        title: goalData.name,
        category: goalData.category,
        description: goalData.description,
        importance: goalData.importance,
        completed: goalData.completed,
      },
      goalId: goalId,
    };
    return this.http.patch(
      `${this.path}/monthdata/updateGoal/${monthName}/${goalId}`,
      body
    );
  }
  /* -------------------------------------------------------------------------- */
  /*                                 NOTE ROUTES                                */
  /* -------------------------------------------------------------------------- */
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
  /*                                Update a Note                               */
  /*                        Used by: notes & note-form                          */
  /* -------------------------------------------------------------------------- */
  updateNote(
    monthName: string,
    noteData: any,
    noteId: string
  ): Observable<any> {
    const body = {
      monthName: monthName,
      noteData: {
        title: noteData.name,
        category: noteData.category,
        description: noteData.description,
      },
      noteId: noteId,
    };
    return this.http.patch(
      `${this.path}/monthdata/updateNote/${monthName}/${noteId}`,
      body
    );
  }
  /* -------------------------------------------------------------------------- */
  /*                               LEARNED ROUTES                               */
  /* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                                Update a Learned                            */
  /*                        Used by: learned & learned-form                     */
  /* -------------------------------------------------------------------------- */
  updateLearned(
    monthName: string,
    learnedData: any,
    learnedId: string
  ): Observable<any> {
    const body = {
      monthName: monthName,
      learnedData: {
        title: learnedData.name,
        category: learnedData.category,
        description: learnedData.description,
      },
      learnedId: learnedId,
    };
    return this.http.patch(
      `${this.path}/monthdata/updateLearned/${monthName}/${learnedId}`,
      body
    );
  }
  /* -------------------------------------------------------------------------- */
  /*                                WEEK ROUTES                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                Add a new Week                              */
  /*                        Used by: to-do & to-do-form                     */
  /* -------------------------------------------------------------------------- */
  addWeek(monthName: string, weekData: any): Observable<any> {
    const body = {
      monthName: monthName,
      weekData: weekData,
    };
    return this.http.post(`${this.path}/monthdata/addWeek/${monthName}`, body);
  }
}

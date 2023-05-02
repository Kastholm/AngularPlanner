import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'monthly-goals',
  templateUrl: './monthly-goals.component.html',
  styleUrls: ['./monthly-goals.component.scss'],
})
export class MonthlyGoalsComponent {
  goals: any = [];

  //Public
   constructor(private http: HttpClient) {
    this.http.get('http://192.168.87.155:27019/goals').subscribe((goals) => {
      console.log(goals);
      this.goals = goals;
    });
  }

  //Local
 /*  constructor(private http: HttpClient) {
    this.http.get('http://localhost:4000/goals').subscribe((goals) => {
      console.log(goals);
      this.goals = goals;
    });
  } */
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'monthly-goals',
  templateUrl: './monthly-goals.component.html',
  styleUrls: ['./monthly-goals.component.scss'],
})
export class MonthlyGoalsComponent {
  goals: any = [];

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:4000/goals').subscribe((goals) => {
      console.log(goals);
      this.goals = goals;
    });
  }
}

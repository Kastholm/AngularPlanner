import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '../routing.service';
import { MonthapiService } from '../../monthapi.service';
@Component({
  selector: 'goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  providers: [RoutingService],
})
export class GoalsComponent implements OnInit {
  constructor(
    private routing: RoutingService,
    private monthApi: MonthapiService
  ) {}

  ngOnInit() {
    this.routing.fetchDataAndSetMonthData();
  }

  get monthChosen() {
    return this.routing.monthChosen;
  }

  get monthdata() {
    return this.routing.monthdata;
  }

  updateGoal(title: string, category: string, description: string, importance: number, completed: boolean) {
    console.log('updateGoal Parent called');
    console.log('updateGoal Parent called with data:', title, category, description, importance, completed);
  }

  doneTask(goalName: string) {
    document.querySelectorAll('.goalName').forEach((goal, index) => {
      // If goal title === goal.textContent then call the doneTask function
      if (goalName === goal.textContent?.trim()) {
        // Send data to DB
        /* this.monthApi.goalStatus(this.monthChosen, goalName, true); */
        console.log(
          'doneTask component function called',
          this.monthChosen,
          goalName
        );
        //target the granparent
        /* if (goal.parentElement && goal.parentElement.parentElement) {
          goal.parentElement.parentElement.classList.add('taskDone');
        } */
      }
    });
  }
}

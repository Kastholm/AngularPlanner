import { Component } from '@angular/core';

@Component({
  selector: 'goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent {
  importance(): number[] {
    const numbers = [];
    for (let i = 1; i < 6; i++) {
      numbers.push(i);
    }
    return numbers;
  }
}

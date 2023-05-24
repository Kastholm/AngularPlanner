import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { MonthapiService } from '../services/monthapi.service';
import { marked } from 'marked';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  // Use providers to create a new instance of the RoutingService
  providers: [RoutingService],
})
export class ToDoComponent implements OnInit {
  // Setting monthName to empty string by default
  monthName: string = '';
  //Loading Object
  Object = Object;
  // Exclude the _id string from the object
  public excludeId(object: any): string[] {
    return Object.keys(object).filter((key) => key !== '_id');
  }
  asIsOrder(a: any, b: any) {
    return 1;
  }
  getTasks(value: unknown): any[] {
    return value as any[];
  }
  constructor(
    public routing: RoutingService,
    private monthApi: MonthapiService
  ) {}

  // Fetch data and set month data - returns a promise
  ngOnInit() {
    this.monthName = this.routing.monthChosen;
    this.routing.fetchDataAndSetMonthData();
  }
  get monthChosen() {
    return this.routing.monthChosen;
  }
  // Get the month data from the Routing service
  get monthdata() {
    return this.routing.monthdata;
  }

  addTodoEvent(dayIndex: number) {
    Swal.fire({
      title: 'Add new task',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Task Title">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Task Description">',
      focusConfirm: false,
      preConfirm: () => {
        const title = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const description = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        return { title: title, description: description };
      },
    }).then((result) => {
      if (result.value) {
        const todoData = result.value;
        const monthIndex = this.monthdata.findIndex(
          (month: any) => month.name === this.monthChosen
        );

        if (monthIndex !== -1 && this.monthdata[monthIndex].weeks) {
          const dayOfWeek = Object.keys(this.monthdata[monthIndex].weeks[0])[
            dayIndex
          ];
          const dayIndexInWeek = this.monthdata[monthIndex].weeks.findIndex(
            (week: any) => week.hasOwnProperty(dayOfWeek)
          );

          if (dayOfWeek && dayIndexInWeek !== -1) {
            this.monthdata[monthIndex].weeks[dayIndexInWeek][dayOfWeek].push(
              todoData
            );

            // Send data to DB
            console.log('Month chosen:', this.monthChosen);
            console.log('Day of week:', dayOfWeek);
            console.log('Adding todo:', JSON.stringify(todoData));

            this.monthApi
              .sendTodo(this.monthChosen, dayOfWeek, todoData) // Update the parameters
              .subscribe(
                (res) => {
                  console.log('New todo added:', res, dayOfWeek);
                },
                (err) => {
                  console.log('error', dayOfWeek);
                }
              );
          }
        }

        Swal.fire('Todo Added', 'A new todo has been added.', 'success');
      }
    });
  }

  toggleTodoCompletion(
    monthName: string,
    dayName: any,
    todoIndex: number
  ): void {
    const monthIndex = this.monthdata.findIndex(
      (month: any) => month.name === monthName
    );

    if (monthIndex !== -1 && this.monthdata[monthIndex].weeks) {
      const dayIndexInWeek = this.monthdata[monthIndex].weeks.findIndex(
        (week: any) => week.hasOwnProperty(dayName)
      );

      if (dayName && dayIndexInWeek !== -1) {
        const todo =
          this.monthdata[monthIndex].weeks[dayIndexInWeek][dayName][todoIndex];
        todo.completed = !todo.completed; // Toggle completion status

        this.monthApi
          .updateTodo(monthName, dayName, todo._id, todo.completed)
          .subscribe(
            (res) => {
              console.log('Todo updated:', res);
            },
            (err) => {
              console.log('error updating todo');
            }
          );
      }
    }
  }
}

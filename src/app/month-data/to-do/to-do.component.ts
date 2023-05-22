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
export class ToDoComponent {
  // Setting monthName to empty string by default
  monthName: string = '';
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
}

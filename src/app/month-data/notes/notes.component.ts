import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../routing.service';
import { MonthapiService } from '../../monthapi.service';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    private routing: RoutingService,
    private monthApi: MonthapiService
  ) {}

  // Fetch data and set month data - returns a promise
  ngOnInit() {
    this.routing.fetchDataAndSetMonthData();
  }
  // Get the selected month from the Routing service
  get monthChosen() {
    return this.routing.monthChosen;
  }
  // Get the month data from the Routing service
  get monthdata() {
    return this.routing.monthdata;
  }
}

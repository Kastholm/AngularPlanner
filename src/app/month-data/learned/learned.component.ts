import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { MonthapiService } from '../services/monthapi.service';
// Importing needed packages
// @ts-ignore
import { marked } from 'marked';
@Component({
  selector: 'learned',
  templateUrl: './learned.component.html',
  styleUrls: ['./learned.component.scss'],
  // Use providers to create a new instance of the RoutingService
  providers: [RoutingService],
})
export class LearnedComponent implements OnInit {
  constructor(
    public routing: RoutingService,
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
  //Loading Markdown
  parseMarkdown(content: string): string {
    return marked(content);
  }
}

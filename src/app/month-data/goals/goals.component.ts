import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { MonthapiService } from '../services/monthapi.service';
import { marked } from 'marked';
@Component({
  selector: 'goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  // Use providers to create a new instance of the RoutingService
  providers: [RoutingService],
})
export class GoalsComponent implements OnInit {
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

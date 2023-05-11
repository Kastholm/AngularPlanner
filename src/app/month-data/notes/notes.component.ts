import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../routing.service';
import { MonthapiService } from '../../monthapi.service';
// Importing needed packages
import { marked } from 'marked';
@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  // Use providers to create a new instance of the RoutingService
  providers: [RoutingService],
})
export class NotesComponent implements OnInit {
  constructor(
    private routing: RoutingService,
    private monthApi: MonthapiService
  ) {}

  // Fetch data and set month data - returns a promise
  ngOnInit() {
    this.routing.fetchDataAndSetMonthData();
    //note expand state
    this.initializeExpandedState();
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
  initializeExpandedState() {
    this.monthdata.notes.forEach((note: any) => {
      note.expanded = false;
    });
  }
  toggleExpand(note: any) {
    note.expanded = !note.expanded;
  }
}

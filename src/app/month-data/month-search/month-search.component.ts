import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MonthapiService } from '../services/monthapi.service';
import { marked } from 'marked';

@Component({
  selector: 'app-month-search',
  templateUrl: './month-search.component.html',
  styleUrls: ['./month-search.component.scss'],
})
export class MonthSearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    searchText: new FormControl(''),
  });
  // Assuming you have the data for months and goals here
  searchResultsGoals: any[] = [];
  searchResultsLearned: any[] = [];
  searchResultsNotes: any[] = [];
  constructor(
    public routing: RoutingService,
    private monthApi: MonthapiService
  ) {
    this.searchForm = new FormGroup({
      searchText: new FormControl(''),
    });
  }

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

  onSearch() {
    let searchText = this.searchForm.value.searchText.toLowerCase();
    this.searchResultsGoals = []; // Clear previous results
    this.searchResultsNotes = []; // Clear previous results
    this.searchResultsLearned = []; // Clear previous results

    for (let month of this.monthdata) {
      for (let goal of month.goals) {
          if (goal.title.toLowerCase().includes(searchText) || goal.description.toLowerCase().includes(searchText)) {
              this.searchResultsGoals.push(goal);
          }
      }
      for (let note of month.notes) {
          if (note.title.toLowerCase().includes(searchText) || note.description.toLowerCase().includes(searchText)) {
              this.searchResultsNotes.push(note);
          }
      }
      for (let learned of month.learned) {
        if (learned.title.toLowerCase().includes(searchText) || learned.description.toLowerCase().includes(searchText)) {
            this.searchResultsLearned.push(learned);
        }
    }
  }
}

  initializeExpandedState() {
    this.monthdata.notes.forEach((note: any) => {
      note.expanded = false;
    });
  }
  toggleExpand(note: any) {
    note.expanded = !note.expanded;
  }
  //Loading Markdown
  parseMarkdown(content: string): string {
    return marked(content);
  }
}

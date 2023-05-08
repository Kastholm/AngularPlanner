import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../routing.service';
@Component({
  selector: 'goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  providers: [RoutingService],
})
export class GoalsComponent implements OnInit {
  monthdata: any[] = [];
  monthChosen: string = '';
  constructor(private routing: RoutingService) {}

  ngOnInit() {
    this.monthdata = this.routing.monthdata;
    this.monthChosen = this.routing.monthChosen;
    // Fetch data and set month data
    this.routing.fetchDataAndSetMonthData();
    console.log(this.monthdata);
  }
}

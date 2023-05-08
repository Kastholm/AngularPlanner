import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '../routing.service';
@Component({
  selector: 'goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  providers: [RoutingService],
})
export class GoalsComponent implements OnInit {
  
  constructor(private routing: RoutingService) {}

  ngOnInit() {
    this.routing.fetchDataAndSetMonthData();
  }

  get monthChosen() {
    return this.routing.monthChosen;
  }

  get monthdata() {
    return this.routing.monthdata;
  }
}

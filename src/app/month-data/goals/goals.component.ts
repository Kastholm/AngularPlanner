import { Component, OnInit } from '@angular/core';
import { MonthapiService } from '../../monthapi.service';
import { RoutingService } from '../routing.service';
@Component({
  selector: 'goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  providers: [RoutingService],
})
export class GoalsComponent implements OnInit {
  monthdata: any = [];
  monthChosen: any;
  constructor(
    /*  private monthApi: MonthapiService, */
    private routing: RoutingService
  ) {
    /* this.route.params.subscribe((params) => {
      this.monthChosen = params['month'];
    }); */
  }

  ngOnInit() {
    this.routing.fetchDataAndSetMonthData();
    this.monthdata = this.routing.monthdata;
    this.monthChosen = this.routing.monthChosen;
  }
}

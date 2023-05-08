import { Component, OnInit } from '@angular/core';
import { MonthapiService } from '../../monthapi.service';
import { RoutingService } from '../routing.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  monthdata: any = [];
  monthChosen: any;
  constructor(
    private monthApi: MonthapiService,
    private route: ActivatedRoute
  ) {
    //instance of ActivatedRoute, it contains information about the currently activated route associated with a component
    //params is an Observable that emits a new value whenever the route parameters change
    //When you subscribe to an Observable, you provide a callback function that will be executed every time the Observable emits a new value. In this case, the callback function takes a single argument params, which is an object containing the route parameters.
    this.route.params.subscribe((params) => {
      //access the month parameter from the params object
      this.monthChosen = params['month'];
    });
  }

  ngOnInit() {
    //get api data
    this.monthApi.fetchMonthData().subscribe((data) => {
      //set data
      this.monthApi.setMonthData(data);
      //get data
      this.monthdata = this.monthApi.getMonthData();
    });
  }
}

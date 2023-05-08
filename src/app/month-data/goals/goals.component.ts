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

  async ngOnInit() {
    this.monthChosen = this.routing.monthChosen;
    // Fetch data and set month data
    console.log('før', this.monthdata);
    await this.routing.fetchDataAndSetMonthData();
    this.monthdata = this.routing.monthdata;
    console.log('efter', this.monthdata);
  }
}

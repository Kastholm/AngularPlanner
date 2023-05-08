import { Injectable } from '@angular/core';
import { MonthapiService } from '../monthapi.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  monthdata: any = [];
  monthChosen: any;

  constructor(
    private monthApi: MonthapiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.monthChosen = params['month'];
    });
  }

  fetchDataAndSetMonthData() {
    this.monthApi.fetchMonthData().subscribe((monthdata) => {
      this.monthApi.setMonthData(monthdata);
      this.monthdata = this.monthApi.getMonthData();
    });
  }
}

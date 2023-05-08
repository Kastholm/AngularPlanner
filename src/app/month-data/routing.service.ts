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

  // Fetch data and set month data - returns a promise
  fetchDataAndSetMonthData(): Promise<void> {
    return new Promise((resolve) => {
      this.monthApi.fetchMonthData().subscribe((data) => {
        this.monthApi.setMonthData(data);
        this.monthdata = this.monthApi.getMonthData();
        resolve(); 
      });
    });
  }
}

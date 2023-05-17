import { Injectable } from '@angular/core';
import { MonthapiService } from './monthapi.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  monthdata: any = [];
  monthChosen: any;
  // URL variable to store the base API URL
  private path: string;
  constructor(
    private monthApi: MonthapiService,
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) {
    this.path = this.globalService.globalPath;
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

import { Component, OnInit } from '@angular/core';
import { MonthapiService } from '../monthapi.service';

@Component({
  selector: 'left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent {
  monthdata: any = [];

  constructor(private monthApi: MonthapiService) {}

  ngOnInit() {
    this.monthApi.fetchMonthData().subscribe((data) => {
      this.monthApi.setMonthData(data);
      this.monthdata = this.monthApi.getMonthData();
    });
  }
}

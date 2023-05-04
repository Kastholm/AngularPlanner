import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'month-data',
  templateUrl: './month-data.component.html',
  styleUrls: ['./month-data.component.scss'],
})
export class MonthDataComponent implements OnInit {
  month: any;
  monthdata: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.month = {
      month: this.route.snapshot.params['month'],
    };
  }

 
}

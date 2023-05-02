import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent {
  monthdata: any = [];

  //Public
  /* constructor(private http: HttpClient) {
    this.http.get('http://192.168.87.155:27019/monthdata').subscribe((monthdata) => {
      console.log(monthdata);
      this.monthdata = monthdata;
    });
  } */

  //Local
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:4000/monthdata').subscribe((monthdata) => {
      console.log(monthdata);
      this.monthdata = monthdata;
    });
  }
}

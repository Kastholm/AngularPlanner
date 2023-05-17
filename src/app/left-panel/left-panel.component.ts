import { Component, OnInit } from '@angular/core';
import { MonthapiService } from '../month-data/services/monthapi.service';
import { RoutingService } from '../month-data/services/routing.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent {
  monthdata: any = [];
  constructor(
    private monthApi: MonthapiService,
    private routing: RoutingService
  ) {}

  Refresh() {
    window.location.reload();
  }

  ngOnInit() {
    this.monthApi.fetchMonthData().subscribe((data) => {
      this.monthApi.setMonthData(data);
      this.monthdata = this.monthApi.getMonthData();
    });
  }

  isHovered = false;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  // Create a method that calls the addMonth() method of the service
  async addNewMonth(name: string) {
    const { value: formValues } = await Swal.fire({
      title: 'Månedens navn',
      html: '<input id="swal-input1" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
        ];
      },
    });

    if (formValues) {
      if (formValues[0] === '') {
        Swal.fire({ icon: 'error', html: `<h1>Du skal angive en måned</h1>` });
        return;
      }

      Swal.fire({ icon: 'success', html: `<h1>Måned tilføjet</h1>` });
      // Use formValues[0] and formValues[1] as input values for your API call
      // For example, if you want to use the first input value as the name:
      name = formValues[0];

      this.monthApi.addMonth(name).subscribe(
        (res) => {
          console.log(`${formValues[0]} added successfully:`, res);
          //Runs the fetch so it can update left panel
          this.monthApi.fetchMonthData().subscribe((data) => {
            this.monthApi.setMonthData(data);
            this.monthdata = this.monthApi.getMonthData();
          });
        },
        (err) => {
          console.log('Error adding new month:', err);
          // Handle the error here
        }
      );
    }
  }
}

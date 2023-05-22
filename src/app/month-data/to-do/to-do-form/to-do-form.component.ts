/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
//Importing the needed modules
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Importing Services
import { MonthapiService } from '../../services/monthapi.service';
import { RoutingService } from '../../services/routing.service';
// Importing needed packages
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { marked } from 'marked';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss']
})
export class ToDoFormComponent implements OnInit {
  /* ----------------------------- Default values ----------------------------- */
  // Setting monthName to empty string by default
  monthName: string = '';
  parseMarkdown(content: string): string {
    return marked(content);
  }
  // Implementing services
  /* -------------------------- Implementing services ------------------------- */
  constructor(
    private monthApi: MonthapiService,
    private routing: RoutingService
  ) {
    //dev purpose
    console.log('Du er på goal måned', routing.monthChosen);
  }
  /* --------------------------------- OnInit --------------------------------- */
  ngOnInit() {
    // Initialize the correct monthName depending on the month chosen
    this.monthName = this.routing.monthChosen;
  }

 
}
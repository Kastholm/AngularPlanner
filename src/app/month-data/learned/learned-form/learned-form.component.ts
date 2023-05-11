//Importing the needed modules
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Importing Services
import { MonthapiService } from '../../../monthapi.service';
import { RoutingService } from '../../routing.service';
// Importing needed packages
import Swal from 'sweetalert2/dist/sweetalert2.js';
// @ts-ignore
import { marked } from 'marked';

@Component({
  selector: 'learned-form',
  templateUrl: './learned-form.component.html',
  styleUrls: ['./learned-form.component.scss']
})
export class LearnedFormComponent implements OnInit  {
 // Setting monthName to empty string by default
 monthName: string = '';
 // Implementing services
 constructor(
   private monthApi: MonthapiService,
   private routing: RoutingService
 ) {
   //dev purpose
   console.log('Du er på learned måned', routing.monthChosen);
 }
 ngOnInit() {
   // Initialize the correct monthName depending on the month chosen
   this.monthName = this.routing.monthChosen;
 }



 parseMarkdown(content: string): string {
  return marked(content);
}

private async createCustomAlert() {
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Titel';
  titleInput.classList.add(
    'border',
    'rounded-lg',
    'my-3',
    'py-3',
    'px-3',
    'bg-gray-700',
    'border-gray-700',
    'placeholder-gray-500'
  );

  const categorySelect = document.createElement('select');
  categorySelect.classList.add(
    'border',
    'rounded-lg',
    'my-3',
    'py-3',
    'px-3',
    'bg-gray-700',
    'border-gray-700',
    'placeholder-gray-500'
  );
  const categories = [
    'Hjemmeside',
    'Backend',
    'Frontend',
    'Homeassistant',
    'Study',
    'Web Environment',
  ];
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  const textarea = document.createElement('textarea');
  const preview = document.createElement('div');
  const form = document.createElement('form');
  form.className =
    'markdown-body bg-coal flex flex-col border border-gray-900 rounded-lg px-8 py-6';
  textarea.classList.add(
    'border',
    'rounded-lg',
    'my-3',
    'py-3',
    'px-3',
    'bg-gray-700',
    'border-gray-700',
    'placeholder-gray-500',
    'h-60'
  );
  textarea.placeholder = 'Enter your description';

  textarea.addEventListener('input', () => {
    preview.innerHTML = this.parseMarkdown(textarea.value);
  });

  form.appendChild(titleInput);
  form.appendChild(categorySelect);
  form.appendChild(textarea);
  form.appendChild(preview);

  return Swal.fire({
    title: 'Tilføj en ny Learned',
    html: form,
    focusConfirm: false,
    preConfirm: () => {
      const name = titleInput.value;
      const category = categorySelect.value;
      const description = textarea.value;

      // Returns the values of the form
      return {
        name,
        category,
        description,
      };
    },
  });
}

async addNewLearned() {
  const { value: learnedValues } = await this.createCustomAlert();

  if (learnedValues) {
    // Catching the values from the form
    const { name, category, description } = learnedValues;
    // If name is empty, return
    if (name === '') {
      Swal.fire({ icon: 'error', html: `<h1>Du skal angive alle data</h1>` });
      return;
    }
    // Send data to DB
    this.monthApi.addLearned(this.monthName, learnedValues).subscribe(
      (res) => {
        console.log('New goal added:', res);
      },
      (err) => {
        console.log('Error adding new month:', err);
      }
    );
    //dev purpose
    console.log('Learned values', learnedValues);
  }
}


}

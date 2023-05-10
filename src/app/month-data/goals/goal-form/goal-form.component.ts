//Importing the needed modules
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Importing Services
import { MonthapiService } from '../../../monthapi.service';
import { RoutingService } from '../../routing.service';
// Importing needed packages
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent implements OnInit {
  //@Input() currentMonth: string = ''; Slet senere hvis ikke bruges
  //monthdata: any = []; Slet senere hvis ikke bruges

  // Setting monthName to empty string by default
  monthName: string = '';
  // Implementing services
  constructor(
    private monthApi: MonthapiService,
    private routing: RoutingService
  ) {
    //dev purpose
    console.log('Du er på måned', routing.monthChosen);
  }
  ngOnInit() {
    // Initialize the correct monthName depending on the month chosen
    this.monthName = this.routing.monthChosen;
  }
  // SweetAlert Form
  async addNewGoal() {
    const formHtml = `
      <div class="bg-coal flex flex-col border border-gray-900 rounded-lg px-8 py-6">
      
    <form class="flex flex-col space-y-8 mt-10">
      <input
        type="text"
        placeholder="Titel"
        class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
      />
      <select
        id="countries"
        placeholder="First name"
        class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
      >
        <option selected>Vælg kategori</option>
        <option value="Hjemmeside">Hjemmeside</option>
        <option value="Backend">Backend</option>
        <option value="Homeassistant">Homeassistant</option>
        <option value="Study">Study</option>
        <option value="Web Environment">Web Environment</option>
      </select>
      <div class="flex flex-col">
        <textarea
          class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500 h-40"
          placeholder="Enter your description"
        ></textarea>
      </div>
      <select
  id="importance"
  class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
    </form>
      </div>
    `;

    const { value: formValues } = await Swal.fire({
      title: 'Add New Goal',
      html: formHtml,
      focusConfirm: false,
      // Sets the HTML for the popup
      preConfirm: () => {
        const name = (Swal.getPopup() as HTMLElement).querySelector(
          'input[type="text"]'
        ) as HTMLInputElement;
        const category = (Swal.getPopup() as HTMLElement).querySelector(
          'select'
        ) as HTMLSelectElement;
        const description = (Swal.getPopup() as HTMLElement).querySelector(
          'textarea'
        ) as HTMLTextAreaElement;
        const importance = (Swal.getPopup() as HTMLElement).querySelector(
          'select#importance'
        ) as HTMLSelectElement;
        // Returns the values of the form
        return {
          name: name.value,
          category: category.value,
          description: description.value,
          importance: importance.value,
        };
      },
    });

    if (formValues) {
      // Catching the values from the form
      const { name, category, description, importance } = formValues;
      // If name is empty, return
      if (name === '') {
        Swal.fire({ icon: 'error', html: `<h1>Du skal angive alle data</h1>` });
        return;
      }
      // Send data to DB
      this.monthApi.addGoal(this.monthName, formValues).subscribe(
        (res) => {
          console.log('New goal added:', res);
        },
        (err) => {
          console.log('Error adding new month:', err);
        }
      );
      //dev purpose
      console.log('Form values', formValues);
    }
  }

  // Outputing Updategoal to parent
  @Output() requestUpdateGoal = new EventEmitter<{
    title: string;
    category: string;
    description: string;
    importance: number;
    completed: boolean;
  }>();
  // trigger
  triggerUpdateGoal(
    title: string,
    category: string,
    description: string,
    importance: number,
    completed: boolean
  ) {
    this.updateGoal(title, category, description, importance, completed);
    this.requestUpdateGoal.emit({
      title,
      category,
      description,
      importance,
      completed,
    });
  }

  async updateGoal(
    title: string,
    category: string,
    description: string,
    importance: number,
    completed: boolean
  ) {
    {
      const formHtml = `
        <div class="bg-coal flex flex-col border border-gray-900 rounded-lg px-8 py-6">
        
      <form class="flex flex-col space-y-8 mt-10">
        <input
          type="text"
          value="${title}"
          class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
        />
        <select
          id="countries"
          placeholder="First name"
          class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
        >
          <option selected>${category}</option>
          <option value="Hjemmeside">Hjemmeside</option>
          <option value="Backend">Backend</option>
          <option value="Homeassistant">Homeassistant</option>
          <option value="Study">Study</option>
          <option value="Web Environment">Web Environment</option>
        </select>
        <div class="flex flex-col">
          <textarea
            class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500 h-40"
            value="${description}"
          >${description}</textarea>
        </div>
        <select
    id="importance"
    class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
  >
  <option value="${importance}">"${importance}"</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
      </form>
        </div>
      `;

      const { value: editValues } = await Swal.fire({
        title: 'Update Goal',
        html: formHtml,
        focusConfirm: false,
        // Sets the HTML for the popup
        preConfirm: () => {
          const name = (Swal.getPopup() as HTMLElement).querySelector(
            'input[type="text"]'
          ) as HTMLInputElement;
          const category = (Swal.getPopup() as HTMLElement).querySelector(
            'select'
          ) as HTMLSelectElement;
          const description = (Swal.getPopup() as HTMLElement).querySelector(
            'textarea'
          ) as HTMLTextAreaElement;
          const importance = (Swal.getPopup() as HTMLElement).querySelector(
            'select#importance'
          ) as HTMLSelectElement;
          // Returns the values of the form
          return {
            name: name.value,
            category: category.value,
            description: description.value,
            importance: importance.value,
            completed: completed,
          };
        },
      });

      if (editValues) {
        // Catching the values from the form
        const { name, category, description, importance, completed } =
          editValues;

        //dev purpose
        console.log('Her skal router patch være', editValues);
      }
    }
  }
}

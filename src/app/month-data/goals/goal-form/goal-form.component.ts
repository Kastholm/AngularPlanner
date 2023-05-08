import { Component, OnInit, Input } from '@angular/core';
import { MonthapiService } from '../../../monthapi.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent implements OnInit {
  importance(): number[] {
    const numbers = [];
    for (let i = 1; i < 6; i++) {
      numbers.push(i);
    }
    return numbers;
  }
  @Input() currentMonth: string = '';
  monthdata: any = [];
  constructor(private monthApi: MonthapiService) {}
  ngOnInit(): void {}
  async addNewGoal() {
    const formHtml = `
      <div class="bg-gray-800 flex flex-col border border-gray-900 rounded-lg px-8 py-6">
      
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
        <option value="US">Hjemmeside</option>
        <option value="CA">Backend</option>
        <option value="FR">Homeassistant</option>
        <option value="DE">Study</option>
        <option value="DE">Web Environment</option>
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
          '#importance'
        ) as HTMLSelectElement;

        return {
          name: name.value,
          category: category.value,
          description: description.value,
          importance: importance.value,
        };
      },
    });

    if (formValues) {
      const { name, category, description, importance } = formValues;
      if (name === '') {
        return;
      }
      this.monthApi
        .addNewGoal(this.currentMonth, name, category, description, parseInt(importance))
        .subscribe(
          (response) => {
            console.log('Goal added:', response);
          },
          (error) => {
            console.error('Error adding goal:', error);
          }
        );
    }
  }
}

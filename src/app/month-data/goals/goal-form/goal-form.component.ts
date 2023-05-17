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
/* -------------------------------------------------------------------------- */
/*                         COMPONENT SELECTORS                                */
/* -------------------------------------------------------------------------- */
@Component({
  selector: 'goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
/* -------------------------------------------------------------------------- */
/*                              EXPORT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export class GoalFormComponent implements OnInit {
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

  /* -------------------------------------------------------------------------- */
  /*                             CREATE A GOAL FORM                             */
  /* -------------------------------------------------------------------------- */
  private async createGoalAlert() {
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

    const importanceSelect = document.createElement('select');
    importanceSelect.classList.add(
      'border',
      'rounded-lg',
      'my-3',
      'py-3',
      'px-3',
      'bg-gray-700',
      'border-gray-700',
      'placeholder-gray-500'
    );
    const importanceOption = ['0', '1', '2', '3', '4', '5'];
    importanceOption.forEach((importance) => {
      const option = document.createElement('option');
      option.value = importance;
      option.textContent = importance;
      importanceSelect.appendChild(option);
    });

    form.appendChild(titleInput);
    form.appendChild(categorySelect);
    form.appendChild(textarea);
    form.appendChild(importanceSelect);
    form.appendChild(preview);

    return Swal.fire({
      title: 'Tilføj en ny goal',
      html: form,
      focusConfirm: false,
      preConfirm: () => {
        const name = titleInput.value;
        const category = categorySelect.value;
        const description = textarea.value;
        const importance = importanceSelect.value;

        // Returns the values of the form
        return {
          name,
          category,
          description,
          importance,
        };
      },
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                        ADD THE GOAL TO THE DATABASE                        */
  /* -------------------------------------------------------------------------- */
  async addNewGoal() {
    const { value: goalValues } = await this.createGoalAlert();

    if (goalValues) {
      // Catching the values from the form
      const { name, category, description, importance } = goalValues;
      // If name is empty, return
      if (name === '') {
        Swal.fire({ icon: 'error', html: `<h1>Du skal angive alle data</h1>` });
        return;
      }
      // Send data to DB
      this.monthApi.addGoal(this.monthName, goalValues).subscribe(
        (res) => {
          console.log('New goal added:', res);
        },
        (err) => {
          console.log('Error adding new month:', err);
        }
      );
      //dev purpose
      console.log('Note values', goalValues);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                             UPDATE A GOAL FORM                             */
  /* -------------------------------------------------------------------------- */
  private async updateGoalAlert(
    goalTitle: string,
    goalCategory: string,
    goalDescription: string,
    goalImportance: string,
    goalCompleted: boolean
  ) {
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Titel';
    titleInput.value = goalTitle;
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
      if (category === goalCategory) {
        option.selected = true;
      }
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
    textarea.value = goalDescription;
    textarea.addEventListener('input', () => {
      preview.innerHTML = this.parseMarkdown(textarea.value);
    });

    const importanceSelect = document.createElement('select');
    importanceSelect.classList.add(
      'border',
      'rounded-lg',
      'my-3',
      'py-3',
      'px-3',
      'bg-gray-700',
      'border-gray-700',
      'placeholder-gray-500'
    );
    const importanceOption = ['0', '1', '2', '3', '4', '5'];
    importanceOption.forEach((importance) => {
      const option = document.createElement('option');
      option.value = importance;
      option.textContent = importance;
      if (importance === goalImportance) {
        option.selected = true;
      }
      importanceSelect.appendChild(option);
    });

    const completedStatus = document.createElement('p');
    completedStatus.textContent = goalCompleted ? 'Completed' : 'Not completed';

    completedStatus.addEventListener('click', () => {
      goalCompleted = !goalCompleted;
      completedStatus.textContent = goalCompleted
        ? 'Completed'
        : 'Not completed';

      if (goalCompleted) {
        completedStatus.classList.add(
          'bg-green-500',
          'border-green-500',
          'placeholder-green-500'
        );
        completedStatus.classList.remove(
          'bg-red-500',
          'border-red-500',
          'placeholder-red-500'
        );
      } else {
        completedStatus.classList.add(
          'bg-red-500',
          'border-red-500',
          'placeholder-red-500'
        );
        completedStatus.classList.remove(
          'bg-green-500',
          'border-green-500',
          'placeholder-green-500'
        );
      }
    });

    completedStatus.classList.add(
      'border',
      'rounded-lg',
      'my-3',
      'py-3',
      'px-3',
      goalCompleted ? 'bg-green-500' : 'bg-red-500',
      goalCompleted ? 'border-green-500' : 'border-red-500',
      goalCompleted ? 'placeholder-green-500' : 'placeholder-red-500'
    );

    form.appendChild(titleInput);
    form.appendChild(categorySelect);
    form.appendChild(textarea);
    form.appendChild(importanceSelect);
    form.appendChild(completedStatus);
    form.appendChild(preview);

    return Swal.fire({
      title: 'Opdater en ny goal',
      html: form,
      focusConfirm: false,
      preConfirm: () => {
        const name = titleInput.value;
        const category = categorySelect.value;
        const description = textarea.value;
        const importance = importanceSelect.value;
        const completed = goalCompleted;

        // Returns the values of the form
        return {
          name,
          category,
          description,
          importance,
          completed,
        };
      },
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                     UPDATE THE GOAL IN THE DATABASE                        */
  /* -------------------------------------------------------------------------- */
  async updateGoal(
    title: string,
    category: string,
    description: string,
    importance: string,
    completed: boolean,
    goalId: string
  ) {
    const { value: updateGoalValues } = await this.updateGoalAlert(
      title,
      category,
      description,
      importance,
      completed
    );

    if (updateGoalValues) {
      // Catching the values from the form
      const { name, category, description, importance, completed } =
        updateGoalValues;
      // If name is empty, return
      if (name === '') {
        Swal.fire({ icon: 'error', html: `<h1>Du skal angive alle data</h1>` });
        return;
      }
      // Send data to DB
      this.monthApi
        .updateGoal(this.monthName, updateGoalValues, goalId)
        .subscribe(
          (res) => {
            console.log('New goal added:', res);
          },
          (err) => {
            console.log('Error adding new month:', err);
          }
        );
      //dev purpose
      console.log('Note values', updateGoalValues);
    }
  }
}

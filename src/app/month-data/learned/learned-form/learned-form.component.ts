/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
//Importing the needed modules
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Importing Services
import { MonthapiService } from '../../../monthapi.service';
import { RoutingService } from '../../routing.service';
// Importing needed packages
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { marked } from 'marked';
/* -------------------------------------------------------------------------- */
/*                         COMPONENT SELECTORS                                */
/* -------------------------------------------------------------------------- */
@Component({
  selector: 'learned-form',
  templateUrl: './learned-form.component.html',
  styleUrls: ['./learned-form.component.scss'],
})
/* -------------------------------------------------------------------------- */
/*                              EXPORT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export class LearnedFormComponent implements OnInit {
  /* ----------------------------- Default values ----------------------------- */
  // Setting monthName to empty string by default
  monthName: string = '';
  parseMarkdown(content: string): string {
    return marked(content);
  }
  /* -------------------------- Implementing services ------------------------- */
  constructor(
    private monthApi: MonthapiService,
    private routing: RoutingService
  ) {
    //dev purpose
    console.log('Du er på learned måned', routing.monthChosen);
  }
  /* --------------------------------- OnInit --------------------------------- */
  ngOnInit() {
    // Initialize the correct monthName depending on the month chosen
    this.monthName = this.routing.monthChosen;
  }
  /* -------------------------------------------------------------------------- */
  /*                            LEARNED DEFAULT FORM                            */
  /* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                       ADD THE LEARNED TO THE DATABASE                      */
  /* -------------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------- */
  /*                          UPDATE A LEARNED FORM                             */
  /* -------------------------------------------------------------------------- */
  private async updateLearnedAlert(
    learnedTitle: string,
    learnedCategory: string,
    learnedDescription: string
  ) {
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Titel';
    titleInput.value = learnedTitle;
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
      if (category === learnedCategory) {
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
    textarea.value = learnedDescription;
    textarea.addEventListener('input', () => {
      preview.innerHTML = this.parseMarkdown(textarea.value);
    });

    form.appendChild(titleInput);
    form.appendChild(categorySelect);
    form.appendChild(textarea);
    form.appendChild(preview);

    return Swal.fire({
      title: 'Opdater en learned',
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
  /* -------------------------------------------------------------------------- */
  /*                    UPDATE THE LEARNED IN THE DATABASE                      */
  /* -------------------------------------------------------------------------- */
  async updateLearned(
    title: string,
    category: string,
    description: string,
    learnedId: string
  ) {
    //Funtion som aktiveres af parent
    console.log('title, category, description', title, category, description);
    const { value: updateLearnedValues } = await this.updateLearnedAlert(
      title,
      category,
      description
    );

    if (updateLearnedValues) {
      // Catching the values from the form
      const { name, category, description } = updateLearnedValues;
      // If name is empty, return
      if (name === '') {
        Swal.fire({ icon: 'error', html: `<h1>Du skal angive alle data</h1>` });
        return;
      }
      // Send data to DB
      this.monthApi
        .updateLearned(this.monthName, updateLearnedValues, learnedId)
        .subscribe(
          (res) => {
            console.log('New goal added:', res);
          },
          (err) => {
            console.log('Error adding new month:', err);
          }
        );
      //dev purpose
      console.log(
        'Dether burde være month',
        this.monthName,
        'Det her burde være learned name',
        name,
        'dether burde være learned id',
        learnedId,
        'updateLearnedValues kommer her',
        updateLearnedValues,
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero ab cupiditate possimus quod a, eum, aspernatur natus impedit, magni harum voluptatum ea quia deserunt. Vitae excepturi sequi eos odit, quae impedit cupiditate harum nemo nisi laboriosam ea natus sit iste fugiat amet beatae ducimus, accusantium architecto voluptas voluptatum odio dolorum saepe dicta quos! Ratione quasi optio totam in aspernatur explicabo eligendi nulla ipsam ea officia nesciunt facilis, soluta cumque dolore recusandae quas? Dolore porro laboriosam quos quo eius est assumenda quidem aliquam, facere fuga quas accusamus ipsam illo, at quod molestiae a recusandae placeat harum fugit reprehenderit ea, deleniti maiores.'
      );
    }
  }
}

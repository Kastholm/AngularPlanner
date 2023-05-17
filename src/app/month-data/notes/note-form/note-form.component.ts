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
  selector: 'note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
/* -------------------------------------------------------------------------- */
/*                              EXPORT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export class NoteFormComponent implements OnInit {
  /* ----------------------------- Default values ----------------------------- */
  // Setting monthName to empty string by default
  monthName: string = '';
  //Note content expanded default state
  isExpanded = false;

  @Output() noteAdded: EventEmitter<void> = new EventEmitter<void>();
  //Importing the marked package (Markdown)
  parseMarkdown(content: string): string {
    return marked(content);
  }
  /* -------------------------- Implementing services ------------------------- */
  constructor(
    private monthApi: MonthapiService,
    private routing: RoutingService
  ) {}
  /* --------------------------------- OnInit --------------------------------- */
  ngOnInit() {
    // Initialize the correct monthName depending on the month chosen
    this.monthName = this.routing.monthChosen;
  }
  /* -------------------------------------------------------------------------- */
  /*                             CREATE A NOTE FORM                             */
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
      title: 'Tilføj en ny note',
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
  /*                        ADD THE NOTE TO THE DATABASE                        */
  /* -------------------------------------------------------------------------- */
  async addNewNote() {
    const { value: noteValues } = await this.createCustomAlert();

    if (noteValues) {
      // Catching the values from the form
      const { name, category, description } = noteValues;
      // If name is empty, return
      if (name === '') {
        Swal.fire({ icon: 'error', html: `<h1>Du skal angive alle data</h1>` });
        return;
      }
      // Send data to DB
      this.monthApi.addNote(this.monthName, noteValues).subscribe(
        (res) => {
          console.log('New goal added:', res);
          this.noteAdded.emit();
        },
        (err) => {
          console.log('Error adding new month:', err);
        }
      );
      //dev purpose
      console.log('Note values', noteValues);
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                             UPDATE A NOTE FORM                             */
  /* -------------------------------------------------------------------------- */
  private async updateNoteAlert(
    noteTitle: string,
    noteCategory: string,
    noteDescription: string
  ) {
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Titel';
    titleInput.value = noteTitle;
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
      if (category === noteCategory) {
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
    textarea.value = noteDescription;
    textarea.addEventListener('input', () => {
      preview.innerHTML = this.parseMarkdown(textarea.value);
    });

    form.appendChild(titleInput);
    form.appendChild(categorySelect);
    form.appendChild(textarea);
    form.appendChild(preview);

    return Swal.fire({
      title: 'Opdater en note',
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
  /*                       UPDATE THE NOTE IN THE DATABASE                      */
  /* -------------------------------------------------------------------------- */
  async updateNote(
    title: string,
    category: string,
    description: string,
    noteId: string
  ) {
    //Funtion som aktiveres af parent
    console.log('title, category, description', title, category, description);
    const { value: updateNoteValues } = await this.updateNoteAlert(
      title,
      category,
      description
    );

    if (updateNoteValues) {
      // Catching the values from the form
      const { name, category, description } = updateNoteValues;
      // If name is empty, return
      if (name === '') {
        Swal.fire({ icon: 'error', html: `<h1>Du skal angive alle data</h1>` });
        return;
      }
      // Send data to DB
      this.monthApi
        .updateNote(this.monthName, updateNoteValues, noteId)
        .subscribe(
          (res) => {
            console.log('New goal added:', res);
            this.noteAdded.emit();
          },
          (err) => {
            console.log('Error adding new month:', err);
          }
        );
    }
  }
}

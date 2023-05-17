/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
//Importing the needed modules
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Importing Services
import { ShoppinglistService } from './services/shoppinglist.service';
// Importing needed packages
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { marked } from 'marked';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  constructor(private shoppingAPI: ShoppinglistService) {}

  shoppingData: any[] = [];
  //Importing the marked package (Markdown)
  parseMarkdown(content: string): string {
    return marked(content);
  }

  ngOnInit() {
    this.shoppingAPI.fetchShoppingData().subscribe(
      (data) => {
        this.shoppingData = data;
        console.log('Shopping data fetched:', data);
      },
      (error) => {
        console.error('Error fetching shopping data:', error);
      }
      );
      /* this.shoppingData.push(res); */
  }

  deleteItem(itemId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoppingData = this.shoppingData.filter((item) => item._id !== itemId);
        this.shoppingAPI.deleteItem(itemId).subscribe((res) => {
          console.log('Item deleted:', res);
          
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                             CREATE A NOTE FORM                             */
  /* -------------------------------------------------------------------------- */
  private async createItemAlert() {
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
    form.appendChild(textarea);
    form.appendChild(preview);

    return Swal.fire({
      title: 'Tilføj en ny note',
      html: form,
      focusConfirm: false,
      preConfirm: () => {
        const name = titleInput.value;
        const description = textarea.value;

        // Returns the values of the form
        return {
          name,
          description,
        };
      },
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                        ADD THE ITEM TO THE DATABASE                        */
  /* -------------------------------------------------------------------------- */
  async addNewItem() {
    const { value: itemValues } = await this.createItemAlert();

    if (itemValues) {
      // Catching the values from the form
      const { name, description } = itemValues;
      // If name is empty, return
      if (name === '') {
        Swal.fire({ icon: 'error', html: `<h1>Du skal angive alle data</h1>` });
        return;
      }
      // Send data to DB
      this.shoppingAPI
        .addItem(itemValues.name, itemValues.description)
        .subscribe(
          (res) => {
            console.log('New item added:', res);
            this.shoppingData.push(res);
          },
          (err) => {
            console.log('Error adding item:', err);
          }
        );
      //dev purpose
      console.log('item values', itemValues);
    }
  }
}

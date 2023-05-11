import { Component } from '@angular/core';

@Component({
  selector: 'note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {

  addNewNote() { 
    console.log('add new note')
  };
}

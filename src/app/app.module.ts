import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MonthDataComponent } from './month-data/month-data.component';
import { GoalsComponent } from './month-data/goals/goals.component';
import { NotesComponent } from './month-data/notes/notes.component';
import { LearnedComponent } from './month-data/learned/learned.component';
import { CompletedComponent } from './month-data/completed/completed.component';

import { GoalFormComponent } from './month-data/goals/goal-form/goal-form.component';
import { NoteFormComponent } from './month-data/notes/note-form/note-form.component';

const appRoutes: Routes = [
  { path: 'month/:month', component: MonthDataComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    MonthDataComponent,
    GoalsComponent,
    NotesComponent,
    LearnedComponent,
    CompletedComponent,
    GoalFormComponent,
    NoteFormComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

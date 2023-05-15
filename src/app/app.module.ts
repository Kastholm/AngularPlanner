import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
//Components
import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MonthDataComponent } from './month-data/month-data.component';
import { GoalsComponent } from './month-data/goals/goals.component';
import { NotesComponent } from './month-data/notes/notes.component';
import { LearnedComponent } from './month-data/learned/learned.component';
//Subcomponents
import { GoalFormComponent } from './month-data/goals/goal-form/goal-form.component';
import { NoteFormComponent } from './month-data/notes/note-form/note-form.component';
import { LearnedFormComponent } from './month-data/learned/learned-form/learned-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeassistantDashboardComponent } from './homeassistant-dashboard/homeassistant-dashboard.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
//Routes from NgModules
const appRoutes: Routes = [
  { path: 'month/:month', component: MonthDataComponent },
  { path: '', component: DashboardComponent },
  { path: 'homeassistant', component: HomeassistantDashboardComponent },
  { path: 'shoppinglist', component: ShoppingListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    MonthDataComponent,
    GoalsComponent,
    NotesComponent,
    LearnedComponent,
    GoalFormComponent,
    NoteFormComponent,
    LearnedFormComponent,
    DashboardComponent,
    HomeassistantDashboardComponent,
    ShoppingListComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

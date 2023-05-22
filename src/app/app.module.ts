import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/services/auth-guard.service';
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
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ToDoComponent } from './month-data/to-do/to-do.component';
import { ToDoFormComponent } from './month-data/to-do/to-do-form/to-do-form.component';
//Routes from NgModules
// Pages only accesisble when logged in, chosen by AuthGuardService
const appRoutes: Routes = [
  {
    path: 'month/:month',
    component: MonthDataComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  {
    path: 'shoppinglist',
    component: ShoppingListComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: AuthComponent },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuardService], },
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
    ShoppingListComponent,
    AuthComponent,
    SignUpComponent,
    ToDoComponent,
    ToDoFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

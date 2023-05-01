import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MonthlyGoalsComponent } from './monthly-goals/monthly-goals.component';
import { MonthlyGoalsFormComponent } from './monthly-goals/monthly-goals-form/monthly-goals-form.component';
import { MonthlyNotesComponent } from './monthly-notes/monthly-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    MonthlyGoalsComponent,
    MonthlyGoalsFormComponent,
    MonthlyNotesComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

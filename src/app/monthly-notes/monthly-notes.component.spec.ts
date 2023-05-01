import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyNotesComponent } from './monthly-notes.component';

describe('MonthlyNotesComponent', () => {
  let component: MonthlyNotesComponent;
  let fixture: ComponentFixture<MonthlyNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

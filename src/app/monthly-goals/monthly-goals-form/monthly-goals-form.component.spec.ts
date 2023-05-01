import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalsFormComponent } from './monthly-goals-form.component';

describe('MonthlyGoalsFormComponent', () => {
  let component: MonthlyGoalsFormComponent;
  let fixture: ComponentFixture<MonthlyGoalsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyGoalsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyGoalsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

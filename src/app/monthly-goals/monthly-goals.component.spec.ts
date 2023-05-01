import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalsComponent } from './monthly-goals.component';

describe('MonthlyGoalsComponent', () => {
  let component: MonthlyGoalsComponent;
  let fixture: ComponentFixture<MonthlyGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyGoalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

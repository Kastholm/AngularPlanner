import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnedFormComponent } from './learned-form.component';

describe('LearnedFormComponent', () => {
  let component: LearnedFormComponent;
  let fixture: ComponentFixture<LearnedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

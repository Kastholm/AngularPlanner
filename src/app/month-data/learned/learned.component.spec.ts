import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnedComponent } from './learned.component';

describe('LearnedComponent', () => {
  let component: LearnedComponent;
  let fixture: ComponentFixture<LearnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

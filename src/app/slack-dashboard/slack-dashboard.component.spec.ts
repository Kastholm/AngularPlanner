import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackDashboardComponent } from './slack-dashboard.component';

describe('SlackDashboardComponent', () => {
  let component: SlackDashboardComponent;
  let fixture: ComponentFixture<SlackDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlackDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlackDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

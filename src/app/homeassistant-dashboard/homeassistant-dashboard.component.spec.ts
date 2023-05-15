import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeassistantDashboardComponent } from './homeassistant-dashboard.component';

describe('HomeassistantDashboardComponent', () => {
  let component: HomeassistantDashboardComponent;
  let fixture: ComponentFixture<HomeassistantDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeassistantDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeassistantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

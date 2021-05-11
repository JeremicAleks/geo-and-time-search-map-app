import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageEventNavigationComponent } from './admin-page-event-navigation.component';

describe('AdminPageEventNavigationComponent', () => {
  let component: AdminPageEventNavigationComponent;
  let fixture: ComponentFixture<AdminPageEventNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageEventNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageEventNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

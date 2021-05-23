import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageEventRequestsComponent } from './admin-page-event-requests.component';

describe('AdminPageEventRequestsComponent', () => {
  let component: AdminPageEventRequestsComponent;
  let fixture: ComponentFixture<AdminPageEventRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageEventRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageEventRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

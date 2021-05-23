import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageUserRequestsComponent } from './admin-page-user-requests.component';

describe('AdminPageUserRequestsComponent', () => {
  let component: AdminPageUserRequestsComponent;
  let fixture: ComponentFixture<AdminPageUserRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageUserRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageUserRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

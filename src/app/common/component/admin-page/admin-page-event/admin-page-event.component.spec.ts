import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageEventComponent } from './admin-page-event.component';

describe('AdminPageEventComponent', () => {
  let component: AdminPageEventComponent;
  let fixture: ComponentFixture<AdminPageEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageEventTableComponent } from './admin-page-event-table.component';

describe('AdminPageEventTableComponent', () => {
  let component: AdminPageEventTableComponent;
  let fixture: ComponentFixture<AdminPageEventTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageEventTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

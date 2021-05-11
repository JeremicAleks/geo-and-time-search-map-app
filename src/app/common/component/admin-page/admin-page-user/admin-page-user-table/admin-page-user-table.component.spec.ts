import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageUserTableComponent } from './admin-page-user-table.component';

describe('AdminPageUserTableComponent', () => {
  let component: AdminPageUserTableComponent;
  let fixture: ComponentFixture<AdminPageUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageUserTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

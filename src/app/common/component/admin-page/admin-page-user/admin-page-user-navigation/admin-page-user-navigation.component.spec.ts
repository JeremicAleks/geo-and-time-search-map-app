import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageUserNavigationComponent } from './admin-page-user-navigation.component';

describe('AdminPageUserNavigationComponent', () => {
  let component: AdminPageUserNavigationComponent;
  let fixture: ComponentFixture<AdminPageUserNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageUserNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageUserNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

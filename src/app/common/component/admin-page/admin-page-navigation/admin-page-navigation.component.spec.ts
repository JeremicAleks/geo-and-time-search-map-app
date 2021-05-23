import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageNavigationComponent } from './admin-page-navigation.component';

describe('AdminPageNavigationComponent', () => {
  let component: AdminPageNavigationComponent;
  let fixture: ComponentFixture<AdminPageNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

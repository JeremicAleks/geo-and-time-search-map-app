import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChangeComponent } from './image-change.component';

describe('ImageChangeComponent', () => {
  let component: ImageChangeComponent;
  let fixture: ComponentFixture<ImageChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

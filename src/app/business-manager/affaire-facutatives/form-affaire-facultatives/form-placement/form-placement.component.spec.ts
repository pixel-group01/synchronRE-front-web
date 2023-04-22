import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlacementComponent } from './form-placement.component';

describe('FormPlacementComponent', () => {
  let component: FormPlacementComponent;
  let fixture: ComponentFixture<FormPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPlacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

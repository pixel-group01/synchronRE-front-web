import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssignFonctionComponent } from './form-assign-fonction.component';

describe('FormAssignFonctionComponent', () => {
  let component: FormAssignFonctionComponent;
  let fixture: ComponentFixture<FormAssignFonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAssignFonctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssignFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

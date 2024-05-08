import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReconstitutionComponent } from './form-reconstitution.component';

describe('FormReconstitutionComponent', () => {
  let component: FormReconstitutionComponent;
  let fixture: ComponentFixture<FormReconstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReconstitutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReconstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

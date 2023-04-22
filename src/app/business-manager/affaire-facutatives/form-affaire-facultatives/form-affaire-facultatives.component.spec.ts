import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAffaireFacultativesComponent } from './form-affaire-facultatives.component';

describe('FormAffaireFacultativesComponent', () => {
  let component: FormAffaireFacultativesComponent;
  let fixture: ComponentFixture<FormAffaireFacultativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAffaireFacultativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAffaireFacultativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

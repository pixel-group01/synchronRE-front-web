import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRetournerAffaireComponent } from './form-retourner-affaire.component';

describe('FormRetournerAffaireComponent', () => {
  let component: FormRetournerAffaireComponent;
  let fixture: ComponentFixture<FormRetournerAffaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRetournerAffaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRetournerAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

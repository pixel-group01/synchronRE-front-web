import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaiementSinistreComponent } from './form-paiement-sinistre.component';

describe('FormPaiementSinistreComponent', () => {
  let component: FormPaiementSinistreComponent;
  let fixture: ComponentFixture<FormPaiementSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPaiementSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaiementSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

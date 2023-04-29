import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaiementComponent } from './form-paiement.component';

describe('FormPaiementComponent', () => {
  let component: FormPaiementComponent;
  let fixture: ComponentFixture<FormPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

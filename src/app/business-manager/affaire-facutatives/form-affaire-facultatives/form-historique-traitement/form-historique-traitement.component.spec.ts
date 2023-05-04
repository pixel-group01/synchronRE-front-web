import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHistoriqueTraitementComponent } from './form-historique-traitement.component';

describe('FormHistoriqueTraitementComponent', () => {
  let component: FormHistoriqueTraitementComponent;
  let fixture: ComponentFixture<FormHistoriqueTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHistoriqueTraitementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHistoriqueTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

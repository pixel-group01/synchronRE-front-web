import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementsSinistreComponent } from './paiements-sinistre.component';

describe('PaiementsSinistreComponent', () => {
  let component: PaiementsSinistreComponent;
  let fixture: ComponentFixture<PaiementsSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementsSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementsSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

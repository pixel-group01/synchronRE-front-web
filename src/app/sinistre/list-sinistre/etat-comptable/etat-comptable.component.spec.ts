import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatComptableComponent } from './etat-comptable.component';

describe('EtatComptableComponent', () => {
  let component: EtatComptableComponent;
  let fixture: ComponentFixture<EtatComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatComptableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementsAffairesComponent } from './paiements-affaires.component';

describe('PaiementsAffairesComponent', () => {
  let component: PaiementsAffairesComponent;
  let fixture: ComponentFixture<PaiementsAffairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementsAffairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementsAffairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

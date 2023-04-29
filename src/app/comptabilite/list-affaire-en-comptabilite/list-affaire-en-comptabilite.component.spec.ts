import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAffaireEnComptabiliteComponent } from './list-affaire-en-comptabilite.component';

describe('ListAffaireEnComptabiliteComponent', () => {
  let component: ListAffaireEnComptabiliteComponent;
  let fixture: ComponentFixture<ListAffaireEnComptabiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAffaireEnComptabiliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAffaireEnComptabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueConnexionComponent } from './historique-connexion.component';

describe('HistoriqueConnexionComponent', () => {
  let component: HistoriqueConnexionComponent;
  let fixture: ComponentFixture<HistoriqueConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueConnexionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

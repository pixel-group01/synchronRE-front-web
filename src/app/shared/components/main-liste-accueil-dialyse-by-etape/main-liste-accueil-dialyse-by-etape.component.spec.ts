import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListeAccueilDialyseByEtapeComponent } from './main-liste-accueil-dialyse-by-etape.component';

describe('MainListeAccueilDialyseByEtapeComponent', () => {
  let component: MainListeAccueilDialyseByEtapeComponent;
  let fixture: ComponentFixture<MainListeAccueilDialyseByEtapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainListeAccueilDialyseByEtapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListeAccueilDialyseByEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

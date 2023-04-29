import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversementsAffaireComponent } from './reversements-affaire.component';

describe('ReversementsAffaireComponent', () => {
  let component: ReversementsAffaireComponent;
  let fixture: ComponentFixture<ReversementsAffaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReversementsAffaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversementsAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

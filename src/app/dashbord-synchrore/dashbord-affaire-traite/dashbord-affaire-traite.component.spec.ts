import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordAffaireTraiteComponent } from './dashbord-affaire-traite.component';

describe('DashbordAffaireTraiteComponent', () => {
  let component: DashbordAffaireTraiteComponent;
  let fixture: ComponentFixture<DashbordAffaireTraiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordAffaireTraiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordAffaireTraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

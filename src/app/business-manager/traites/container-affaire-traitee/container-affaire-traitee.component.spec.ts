import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerAffaireTraiteeComponent } from './container-affaire-traitee.component';

describe('ContainerAffaireTraiteeComponent', () => {
  let component: ContainerAffaireTraiteeComponent;
  let fixture: ComponentFixture<ContainerAffaireTraiteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerAffaireTraiteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerAffaireTraiteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

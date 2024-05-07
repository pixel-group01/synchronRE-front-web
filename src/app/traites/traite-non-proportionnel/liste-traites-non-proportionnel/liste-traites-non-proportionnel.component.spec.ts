import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTraitesNonProportionnelComponent } from './liste-traites-non-proportionnel.component';

describe('ListeTraitesNonProportionnelComponent', () => {
  let component: ListeTraitesNonProportionnelComponent;
  let fixture: ComponentFixture<ListeTraitesNonProportionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTraitesNonProportionnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTraitesNonProportionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

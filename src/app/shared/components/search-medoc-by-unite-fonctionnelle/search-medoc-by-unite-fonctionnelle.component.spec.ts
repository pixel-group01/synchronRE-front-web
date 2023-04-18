import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMedocByUniteFonctionnelleComponent } from './search-medoc-by-unite-fonctionnelle.component';

describe('SearchMedocByUniteFonctionnelleComponent', () => {
  let component: SearchMedocByUniteFonctionnelleComponent;
  let fixture: ComponentFixture<SearchMedocByUniteFonctionnelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMedocByUniteFonctionnelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMedocByUniteFonctionnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

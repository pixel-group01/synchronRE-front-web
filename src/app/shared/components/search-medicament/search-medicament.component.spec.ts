import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMedicamentComponent } from './search-medicament.component';

describe('SearchMedicamentComponent', () => {
  let component: SearchMedicamentComponent;
  let fixture: ComponentFixture<SearchMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMedicamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

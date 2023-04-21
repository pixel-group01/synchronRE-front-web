import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAffairesFacultativesComponent } from './list-affaires-facultatives.component';

describe('ListAffairesFacultativesComponent', () => {
  let component: ListAffairesFacultativesComponent;
  let fixture: ComponentFixture<ListAffairesFacultativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAffairesFacultativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAffairesFacultativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairesFacultativeComponent } from './affaires-facultative.component';

describe('AffairesFacultativeComponent', () => {
  let component: AffairesFacultativeComponent;
  let fixture: ComponentFixture<AffairesFacultativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffairesFacultativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffairesFacultativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

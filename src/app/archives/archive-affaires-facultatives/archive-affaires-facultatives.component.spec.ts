import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveAffairesFacultativesComponent } from './archive-affaires-facultatives.component';

describe('ArchiveAffairesFacultativesComponent', () => {
  let component: ArchiveAffairesFacultativesComponent;
  let fixture: ComponentFixture<ArchiveAffairesFacultativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveAffairesFacultativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveAffairesFacultativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

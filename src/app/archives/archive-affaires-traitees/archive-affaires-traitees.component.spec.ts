import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveAffairesTraiteesComponent } from './archive-affaires-traitees.component';

describe('ArchiveAffairesTraiteesComponent', () => {
  let component: ArchiveAffairesTraiteesComponent;
  let fixture: ComponentFixture<ArchiveAffairesTraiteesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveAffairesTraiteesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveAffairesTraiteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconstitutionComponent } from './reconstitution.component';

describe('ReconstitutionComponent', () => {
  let component: ReconstitutionComponent;
  let fixture: ComponentFixture<ReconstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconstitutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

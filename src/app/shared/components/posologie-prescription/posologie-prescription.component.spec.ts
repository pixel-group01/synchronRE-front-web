import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosologiePrescriptionComponent } from './posologie-prescription.component';

describe('PosologiePrescriptionComponent', () => {
  let component: PosologiePrescriptionComponent;
  let fixture: ComponentFixture<PosologiePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosologiePrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosologiePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

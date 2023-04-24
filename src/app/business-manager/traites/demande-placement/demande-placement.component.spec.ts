import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePlacementComponent } from './demande-placement.component';

describe('DemandePlacementComponent', () => {
  let component: DemandePlacementComponent;
  let fixture: ComponentFixture<DemandePlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePlacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheParameterComponent } from './branche-parameter.component';

describe('BrancheParameterComponent', () => {
  let component: BrancheParameterComponent;
  let fixture: ComponentFixture<BrancheParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrancheParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrancheParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

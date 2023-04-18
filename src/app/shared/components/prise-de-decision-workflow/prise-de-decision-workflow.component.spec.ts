import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseDeDecisionWorkflowComponent } from './prise-de-decision-workflow.component';

describe('PriseDeDecisionWorkflowComponent', () => {
  let component: PriseDeDecisionWorkflowComponent;
  let fixture: ComponentFixture<PriseDeDecisionWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriseDeDecisionWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriseDeDecisionWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

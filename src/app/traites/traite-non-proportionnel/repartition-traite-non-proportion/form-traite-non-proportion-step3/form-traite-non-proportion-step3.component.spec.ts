import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTraiteNonProportionStep3Component } from './form-traite-non-proportion-step3.component';

describe('FormTraiteNonProportionStep3Component', () => {
  let component: FormTraiteNonProportionStep3Component;
  let fixture: ComponentFixture<FormTraiteNonProportionStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTraiteNonProportionStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTraiteNonProportionStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

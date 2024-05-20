import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssietePrimeComponent } from './form-assiete-prime.component';

describe('FormAssietePrimeComponent', () => {
  let component: FormAssietePrimeComponent;
  let fixture: ComponentFixture<FormAssietePrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAssietePrimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssietePrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

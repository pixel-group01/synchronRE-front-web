import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrancheComponent } from './form-tranche.component';

describe('FormTrancheComponent', () => {
  let component: FormTrancheComponent;
  let fixture: ComponentFixture<FormTrancheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTrancheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTrancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

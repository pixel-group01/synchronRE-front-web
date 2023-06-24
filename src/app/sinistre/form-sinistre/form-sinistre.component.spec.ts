import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSinistreComponent } from './form-sinistre.component';

describe('FormSinistreComponent', () => {
  let component: FormSinistreComponent;
  let fixture: ComponentFixture<FormSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

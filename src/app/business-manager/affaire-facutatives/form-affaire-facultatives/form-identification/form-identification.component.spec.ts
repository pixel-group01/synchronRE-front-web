import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIdentificationComponent } from './form-identification.component';

describe('FormIdentificationComponent', () => {
  let component: FormIdentificationComponent;
  let fixture: ComponentFixture<FormIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

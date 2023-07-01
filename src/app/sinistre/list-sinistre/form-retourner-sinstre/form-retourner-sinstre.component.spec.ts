import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRetournerSinstreComponent } from './form-retourner-sinstre.component';

describe('FormRetournerSinstreComponent', () => {
  let component: FormRetournerSinstreComponent;
  let fixture: ComponentFixture<FormRetournerSinstreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRetournerSinstreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRetournerSinstreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCessionComponent } from './form-cession.component';

describe('FormCessionComponent', () => {
  let component: FormCessionComponent;
  let fixture: ComponentFixture<FormCessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

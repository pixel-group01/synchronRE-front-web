import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCedenteComponent } from './form-cedente.component';

describe('FormCedenteComponent', () => {
  let component: FormCedenteComponent;
  let fixture: ComponentFixture<FormCedenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCedenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCedenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

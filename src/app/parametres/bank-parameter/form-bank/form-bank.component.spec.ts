import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBankComponent } from './form-bank.component';

describe('FormBankComponent', () => {
  let component: FormBankComponent;
  let fixture: ComponentFixture<FormBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

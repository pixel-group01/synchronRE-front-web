import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankParameterComponent } from './bank-parameter.component';

describe('BankParameterComponent', () => {
  let component: BankParameterComponent;
  let fixture: ComponentFixture<BankParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

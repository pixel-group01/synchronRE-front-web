import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLimiteSouscriptionComponent } from './form-limite-souscription.component';

describe('FormLimiteSouscriptionComponent', () => {
  let component: FormLimiteSouscriptionComponent;
  let fixture: ComponentFixture<FormLimiteSouscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLimiteSouscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLimiteSouscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

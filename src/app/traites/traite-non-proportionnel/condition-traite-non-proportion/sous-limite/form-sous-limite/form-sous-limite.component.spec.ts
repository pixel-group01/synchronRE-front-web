import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSousLimiteComponent } from './form-sous-limite.component';

describe('FormSousLimiteComponent', () => {
  let component: FormSousLimiteComponent;
  let fixture: ComponentFixture<FormSousLimiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSousLimiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSousLimiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

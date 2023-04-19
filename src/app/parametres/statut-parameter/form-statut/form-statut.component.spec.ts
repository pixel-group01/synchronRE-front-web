import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStatutComponent } from './form-statut.component';

describe('FormStatutComponent', () => {
  let component: FormStatutComponent;
  let fixture: ComponentFixture<FormStatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStatutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

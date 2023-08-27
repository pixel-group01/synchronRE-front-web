import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCessionaireComponent } from './form-cessionaire.component';

describe('FormCessionaireComponent', () => {
  let component: FormCessionaireComponent;
  let fixture: ComponentFixture<FormCessionaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCessionaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCessionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

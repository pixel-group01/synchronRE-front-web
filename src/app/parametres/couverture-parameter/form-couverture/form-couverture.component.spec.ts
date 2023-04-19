import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCouvertureComponent } from './form-couverture.component';

describe('FormCouvertureComponent', () => {
  let component: FormCouvertureComponent;
  let fixture: ComponentFixture<FormCouvertureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCouvertureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCouvertureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

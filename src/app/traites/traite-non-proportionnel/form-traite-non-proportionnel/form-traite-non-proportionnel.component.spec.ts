import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTraiteNonProportionnelComponent } from './form-traite-non-proportionnel.component';

describe('FormTraiteNonProportionnelComponent', () => {
  let component: FormTraiteNonProportionnelComponent;
  let fixture: ComponentFixture<FormTraiteNonProportionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTraiteNonProportionnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTraiteNonProportionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRisqueCouvertsComponent } from './form-risque-couverts.component';

describe('FormRisqueCouvertsComponent', () => {
  let component: FormRisqueCouvertsComponent;
  let fixture: ComponentFixture<FormRisqueCouvertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRisqueCouvertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRisqueCouvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

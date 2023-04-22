import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRepartitionComponent } from './form-repartition.component';

describe('FormRepartitionComponent', () => {
  let component: FormRepartitionComponent;
  let fixture: ComponentFixture<FormRepartitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRepartitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRepartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

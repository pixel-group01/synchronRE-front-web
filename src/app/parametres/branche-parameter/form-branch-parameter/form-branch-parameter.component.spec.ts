import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBranchParameterComponent } from './form-branch-parameter.component';

describe('FormBranchParameterComponent', () => {
  let component: FormBranchParameterComponent;
  let fixture: ComponentFixture<FormBranchParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBranchParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBranchParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateInfoUserComponent } from './form-update-info-user.component';

describe('FormUpdateInfoUserComponent', () => {
  let component: FormUpdateInfoUserComponent;
  let fixture: ComponentFixture<FormUpdateInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateInfoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

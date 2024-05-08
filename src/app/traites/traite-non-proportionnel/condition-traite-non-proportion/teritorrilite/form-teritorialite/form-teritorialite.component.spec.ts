import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTeritorialiteComponent } from './form-teritorialite.component';

describe('FormTeritorialiteComponent', () => {
  let component: FormTeritorialiteComponent;
  let fixture: ComponentFixture<FormTeritorialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTeritorialiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTeritorialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

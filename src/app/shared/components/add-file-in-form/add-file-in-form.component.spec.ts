import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileInFormComponent } from './add-file-in-form.component';

describe('AddFileInFormComponent', () => {
  let component: AddFileInFormComponent;
  let fixture: ComponentFixture<AddFileInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFileInFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

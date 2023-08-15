import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInterlocuteurComponent } from './form-interlocuteur.component';

describe('FormInterlocuteurComponent', () => {
  let component: FormInterlocuteurComponent;
  let fixture: ComponentFixture<FormInterlocuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInterlocuteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInterlocuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

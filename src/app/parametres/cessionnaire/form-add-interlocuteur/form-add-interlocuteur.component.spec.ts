import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddInterlocuteurComponent } from './form-add-interlocuteur.component';

describe('FormAddInterlocuteurComponent', () => {
  let component: FormAddInterlocuteurComponent;
  let fixture: ComponentFixture<FormAddInterlocuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddInterlocuteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddInterlocuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

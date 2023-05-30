import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CessionnaireComponent } from './cessionnaire.component';

describe('CessionnaireComponent', () => {
  let component: CessionnaireComponent;
  let fixture: ComponentFixture<CessionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CessionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CessionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

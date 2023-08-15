import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCessionnaireComponent } from './liste-cessionnaire.component';

describe('ListeCessionnaireComponent', () => {
  let component: ListeCessionnaireComponent;
  let fixture: ComponentFixture<ListeCessionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCessionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCessionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

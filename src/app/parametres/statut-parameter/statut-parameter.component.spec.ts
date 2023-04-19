import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutParameterComponent } from './statut-parameter.component';

describe('StatutParameterComponent', () => {
  let component: StatutParameterComponent;
  let fixture: ComponentFixture<StatutParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

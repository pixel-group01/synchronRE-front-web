import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouvertureParameterComponent } from './couverture-parameter.component';

describe('CouvertureParameterComponent', () => {
  let component: CouvertureParameterComponent;
  let fixture: ComponentFixture<CouvertureParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouvertureParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouvertureParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

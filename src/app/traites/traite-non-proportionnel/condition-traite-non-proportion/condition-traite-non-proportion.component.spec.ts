import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionTraiteNonProportionComponent } from './condition-traite-non-proportion.component';

describe('ConditionTraiteNonProportionComponent', () => {
  let component: ConditionTraiteNonProportionComponent;
  let fixture: ComponentFixture<ConditionTraiteNonProportionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionTraiteNonProportionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionTraiteNonProportionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

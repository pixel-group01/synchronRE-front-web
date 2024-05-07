import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionTraiteNonProportionComponent } from './repartition-traite-non-proportion.component';

describe('RepartitionTraiteNonProportionComponent', () => {
  let component: RepartitionTraiteNonProportionComponent;
  let fixture: ComponentFixture<RepartitionTraiteNonProportionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepartitionTraiteNonProportionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartitionTraiteNonProportionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

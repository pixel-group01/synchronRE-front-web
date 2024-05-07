import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiteNonProportionnelComponent } from './traite-non-proportionnel.component';

describe('TraiteNonProportionnelComponent', () => {
  let component: TraiteNonProportionnelComponent;
  let fixture: ComponentFixture<TraiteNonProportionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraiteNonProportionnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraiteNonProportionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

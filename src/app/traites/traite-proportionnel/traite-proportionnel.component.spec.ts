import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiteProportionnelComponent } from './traite-proportionnel.component';

describe('TraiteProportionnelComponent', () => {
  let component: TraiteProportionnelComponent;
  let fixture: ComponentFixture<TraiteProportionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraiteProportionnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraiteProportionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

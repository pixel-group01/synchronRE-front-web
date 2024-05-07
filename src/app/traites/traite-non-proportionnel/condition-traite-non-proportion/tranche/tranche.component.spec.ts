import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancheComponent } from './tranche.component';

describe('TrancheComponent', () => {
  let component: TrancheComponent;
  let fixture: ComponentFixture<TrancheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrancheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

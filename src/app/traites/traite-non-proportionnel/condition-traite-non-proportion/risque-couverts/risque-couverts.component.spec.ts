import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisqueCouvertsComponent } from './risque-couverts.component';

describe('RisqueCouvertsComponent', () => {
  let component: RisqueCouvertsComponent;
  let fixture: ComponentFixture<RisqueCouvertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisqueCouvertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RisqueCouvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

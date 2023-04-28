import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversementsComponent } from './reversements.component';

describe('ReversementsComponent', () => {
  let component: ReversementsComponent;
  let fixture: ComponentFixture<ReversementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReversementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

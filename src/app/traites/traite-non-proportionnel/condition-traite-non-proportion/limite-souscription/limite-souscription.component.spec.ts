import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimiteSouscriptionComponent } from './limite-souscription.component';

describe('LimiteSouscriptionComponent', () => {
  let component: LimiteSouscriptionComponent;
  let fixture: ComponentFixture<LimiteSouscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimiteSouscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimiteSouscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

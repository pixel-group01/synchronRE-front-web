import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousLimiteComponent } from './sous-limite.component';

describe('SousLimiteComponent', () => {
  let component: SousLimiteComponent;
  let fixture: ComponentFixture<SousLimiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousLimiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousLimiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

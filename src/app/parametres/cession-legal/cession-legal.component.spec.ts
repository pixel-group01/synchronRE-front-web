import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CessionLegalComponent } from './cession-legal.component';

describe('CessionLegalComponent', () => {
  let component: CessionLegalComponent;
  let fixture: ComponentFixture<CessionLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CessionLegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CessionLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

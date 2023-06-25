import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistreComponent } from './sinistre.component';

describe('SinistreComponent', () => {
  let component: SinistreComponent;
  let fixture: ComponentFixture<SinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

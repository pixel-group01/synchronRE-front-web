import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistreComptaComponent } from './sinistre-compta.component';

describe('SinistreComptaComponent', () => {
  let component: SinistreComptaComponent;
  let fixture: ComponentFixture<SinistreComptaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinistreComptaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinistreComptaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

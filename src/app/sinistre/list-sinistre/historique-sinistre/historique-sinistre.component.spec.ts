import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueSinistreComponent } from './historique-sinistre.component';

describe('HistoriqueSinistreComponent', () => {
  let component: HistoriqueSinistreComponent;
  let fixture: ComponentFixture<HistoriqueSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

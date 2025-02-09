import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStatistiqueFacComponent } from './liste-statistique-fac.component';

describe('ListeStatistiqueFacComponent', () => {
  let component: ListeStatistiqueFacComponent;
  let fixture: ComponentFixture<ListeStatistiqueFacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeStatistiqueFacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeStatistiqueFacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

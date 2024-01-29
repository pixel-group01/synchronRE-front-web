import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CessionnaireSinsitreComponent } from './cessionnaire-sinsitre.component';

describe('CessionnaireSinsitreComponent', () => {
  let component: CessionnaireSinsitreComponent;
  let fixture: ComponentFixture<CessionnaireSinsitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CessionnaireSinsitreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CessionnaireSinsitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

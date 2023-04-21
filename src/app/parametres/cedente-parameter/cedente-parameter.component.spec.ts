import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CedenteParameterComponent } from './cedente-parameter.component';

describe('CedenteParameterComponent', () => {
  let component: CedenteParameterComponent;
  let fixture: ComponentFixture<CedenteParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CedenteParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CedenteParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

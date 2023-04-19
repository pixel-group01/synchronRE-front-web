import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryParameterComponent } from './country-parameter.component';

describe('CountryParameterComponent', () => {
  let component: CountryParameterComponent;
  let fixture: ComponentFixture<CountryParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

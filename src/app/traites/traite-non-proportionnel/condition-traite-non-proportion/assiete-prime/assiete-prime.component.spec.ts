import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssietePrimeComponent } from './assiete-prime.component';

describe('AssietePrimeComponent', () => {
  let component: AssietePrimeComponent;
  let fixture: ComponentFixture<AssietePrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssietePrimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssietePrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

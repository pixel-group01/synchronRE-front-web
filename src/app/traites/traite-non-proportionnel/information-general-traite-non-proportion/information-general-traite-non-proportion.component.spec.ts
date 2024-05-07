import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationGeneralTraiteNonProportionComponent } from './information-general-traite-non-proportion.component';

describe('InformationGeneralTraiteNonProportionComponent', () => {
  let component: InformationGeneralTraiteNonProportionComponent;
  let fixture: ComponentFixture<InformationGeneralTraiteNonProportionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationGeneralTraiteNonProportionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationGeneralTraiteNonProportionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

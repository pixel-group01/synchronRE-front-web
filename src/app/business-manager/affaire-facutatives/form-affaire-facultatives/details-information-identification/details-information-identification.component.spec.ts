import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInformationIdentificationComponent } from './details-information-identification.component';

describe('DetailsInformationIdentificationComponent', () => {
  let component: DetailsInformationIdentificationComponent;
  let fixture: ComponentFixture<DetailsInformationIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsInformationIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInformationIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

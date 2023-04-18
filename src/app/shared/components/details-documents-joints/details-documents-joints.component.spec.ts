import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDocumentsJointsComponent } from './details-documents-joints.component';

describe('DetailsDocumentsJointsComponent', () => {
  let component: DetailsDocumentsJointsComponent;
  let fixture: ComponentFixture<DetailsDocumentsJointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDocumentsJointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDocumentsJointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

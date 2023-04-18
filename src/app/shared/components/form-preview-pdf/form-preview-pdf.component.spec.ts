import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreviewPdfComponent } from './form-preview-pdf.component';

describe('FormPreviewPdfComponent', () => {
  let component: FormPreviewPdfComponent;
  let fixture: ComponentFixture<FormPreviewPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPreviewPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPreviewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

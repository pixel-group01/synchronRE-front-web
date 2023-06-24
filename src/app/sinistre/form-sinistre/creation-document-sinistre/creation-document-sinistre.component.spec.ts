import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDocumentSinistreComponent } from './creation-document-sinistre.component';

describe('CreationDocumentSinistreComponent', () => {
  let component: CreationDocumentSinistreComponent;
  let fixture: ComponentFixture<CreationDocumentSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationDocumentSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationDocumentSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

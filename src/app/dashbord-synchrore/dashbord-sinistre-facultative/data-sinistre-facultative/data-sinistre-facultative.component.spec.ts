import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSinistreFacultativeComponent } from './data-sinistre-facultative.component';

describe('DataSinistreFacultativeComponent', () => {
  let component: DataSinistreFacultativeComponent;
  let fixture: ComponentFixture<DataSinistreFacultativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSinistreFacultativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSinistreFacultativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

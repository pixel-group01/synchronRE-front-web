import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBusinessOptionalComponent } from './details-business-optional.component';

describe('DetailsBusinessOptionalComponent', () => {
  let component: DetailsBusinessOptionalComponent;
  let fixture: ComponentFixture<DetailsBusinessOptionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBusinessOptionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBusinessOptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

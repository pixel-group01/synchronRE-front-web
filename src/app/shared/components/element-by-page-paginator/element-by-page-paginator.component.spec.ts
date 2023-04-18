import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementByPagePaginatorComponent } from './element-by-page-paginator.component';

describe('ElementByPagePaginatorComponent', () => {
  let component: ElementByPagePaginatorComponent;
  let fixture: ComponentFixture<ElementByPagePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementByPagePaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementByPagePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

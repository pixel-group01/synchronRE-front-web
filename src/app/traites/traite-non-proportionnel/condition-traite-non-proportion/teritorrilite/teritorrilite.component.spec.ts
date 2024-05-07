import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeritorriliteComponent } from './teritorrilite.component';

describe('TeritorriliteComponent', () => {
  let component: TeritorriliteComponent;
  let fixture: ComponentFixture<TeritorriliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeritorriliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeritorriliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

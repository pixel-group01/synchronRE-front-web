import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsSystemComponent } from './logs-system.component';

describe('LogsSystemComponent', () => {
  let component: LogsSystemComponent;
  let fixture: ComponentFixture<LogsSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

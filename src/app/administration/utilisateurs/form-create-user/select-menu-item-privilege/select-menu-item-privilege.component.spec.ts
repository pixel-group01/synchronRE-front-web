import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMenuItemPrivilegeComponent } from './select-menu-item-privilege.component';

describe('SelectMenuItemPrivilegeComponent', () => {
  let component: SelectMenuItemPrivilegeComponent;
  let fixture: ComponentFixture<SelectMenuItemPrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMenuItemPrivilegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMenuItemPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

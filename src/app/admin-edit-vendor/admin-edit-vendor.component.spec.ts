import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditVendorComponent } from './admin-edit-vendor.component';

describe('AdminEditVendorComponent', () => {
  let component: AdminEditVendorComponent;
  let fixture: ComponentFixture<AdminEditVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

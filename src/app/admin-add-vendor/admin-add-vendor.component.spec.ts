import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddVendorComponent } from './admin-add-vendor.component';

describe('AdminAddVendorComponent', () => {
  let component: AdminAddVendorComponent;
  let fixture: ComponentFixture<AdminAddVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

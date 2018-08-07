import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAppointment } from './vendor-bookings.component';

describe('VendorAppointment', () => {
  let component: VendorAppointment;
  let fixture: ComponentFixture<VendorAppointment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAppointment ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAppointment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

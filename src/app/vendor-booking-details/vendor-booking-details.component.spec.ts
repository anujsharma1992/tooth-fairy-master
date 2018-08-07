import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBookingDetailsComponent } from './vendor-booking-details.component';

describe('VendorBookingDetailsComponent', () => {
  let component: VendorBookingDetailsComponent;
  let fixture: ComponentFixture<VendorBookingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBookingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

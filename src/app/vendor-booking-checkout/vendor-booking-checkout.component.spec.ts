import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBookingCheckoutComponent } from './vendor-booking-checkout.component';

describe('VendorBookingCheckoutComponent', () => {
  let component: VendorBookingCheckoutComponent;
  let fixture: ComponentFixture<VendorBookingCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBookingCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBookingCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

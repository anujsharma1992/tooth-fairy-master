import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBookingsComponent } from './vendor-bookings.component';

describe('VendorBookingsComponent', () => {
  let component: VendorBookingsComponent;
  let fixture: ComponentFixture<VendorBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorLocalMapComponent } from './vendor-bookings.component';

describe('VendorLocalMapComponent', () => {
  let component: VendorLocalMapComponent;
  let fixture: ComponentFixture<VendorLocalMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorLocalMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorLocalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

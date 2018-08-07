import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSpotListingComponent } from './vendor-spot-listing.component';

describe('VendorSpotListingComponent', () => {
  let component: VendorSpotListingComponent;
  let fixture: ComponentFixture<VendorSpotListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSpotListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSpotListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorVideoGalleryComponent } from './vendor-bookings.component';

describe('VendorVideoGalleryComponent', () => {
  let component: VendorVideoGalleryComponent;
  let fixture: ComponentFixture<VendorVideoGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorVideoGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorVideoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

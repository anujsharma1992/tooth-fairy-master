import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEditSpotComponent } from './vendor-edit-spot.component';

describe('VendorEditSpotComponent', () => {
  let component: VendorEditSpotComponent;
  let fixture: ComponentFixture<VendorEditSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEditSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEditSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

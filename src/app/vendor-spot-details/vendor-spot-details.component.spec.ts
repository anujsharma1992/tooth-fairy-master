import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSpotDetailsComponent } from './vendor-spot-details.component';

describe('VendorSpotDetailsComponent', () => {
  let component: VendorSpotDetailsComponent;
  let fixture: ComponentFixture<VendorSpotDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSpotDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSpotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCreateSpotComponent } from './vendor-create-spot.component';

describe('VendorCreateSpotComponent', () => {
  let component: VendorCreateSpotComponent;
  let fixture: ComponentFixture<VendorCreateSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorCreateSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCreateSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

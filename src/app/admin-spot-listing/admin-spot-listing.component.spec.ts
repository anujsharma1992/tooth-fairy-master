import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpotListingComponent } from './admin-spot-listing.component';

describe('AdminSpotListingComponent', () => {
  let component: AdminSpotListingComponent;
  let fixture: ComponentFixture<AdminSpotListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSpotListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSpotListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

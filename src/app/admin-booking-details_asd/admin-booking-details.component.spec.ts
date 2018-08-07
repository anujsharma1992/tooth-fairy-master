import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingDetails } from './admin-dashboard.component';

describe('AdminBookingDetails', () => {
  let component: AdminBookingDetails;
  let fixture: ComponentFixture<AdminBookingDetails>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBookingDetails ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

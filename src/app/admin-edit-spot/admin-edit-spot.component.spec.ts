import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditSpotComponent } from './admin-edit-spot.component';

describe('AdminEditSpotComponent', () => {
  let component: AdminEditSpotComponent;
  let fixture: ComponentFixture<AdminEditSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

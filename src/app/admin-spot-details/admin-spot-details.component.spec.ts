import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpotDetailsComponent } from './admin-spot-details.component';

describe('AdminSpotDetailsComponent', () => {
  let component: AdminSpotDetailsComponent;
  let fixture: ComponentFixture<AdminSpotDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSpotDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSpotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

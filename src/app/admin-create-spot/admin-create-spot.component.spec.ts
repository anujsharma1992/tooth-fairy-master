import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateSpotComponent } from './admin-create-spot.component';

describe('AdminCreateSpotComponent', () => {
  let component: AdminCreateSpotComponent;
  let fixture: ComponentFixture<AdminCreateSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

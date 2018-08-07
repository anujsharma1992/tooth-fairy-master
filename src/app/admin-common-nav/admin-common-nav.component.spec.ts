import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommonNavComponent } from './admin-common-nav.component';

describe('AdminCommonNavComponent', () => {
  let component: AdminCommonNavComponent;
  let fixture: ComponentFixture<AdminCommonNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommonNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommonNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

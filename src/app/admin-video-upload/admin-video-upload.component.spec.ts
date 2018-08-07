import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoUploadComponent } from './admin-video-upload.component';

describe('AdminVideoUploadComponent', () => {
  let component: AdminVideoUploadComponent;
  let fixture: ComponentFixture<AdminVideoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

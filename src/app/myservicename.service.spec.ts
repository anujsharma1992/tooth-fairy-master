import { TestBed, inject } from '@angular/core/testing';

import { MyservicenameService } from './myservicename.service';

describe('MyservicenameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyservicenameService]
    });
  });

  it('should be created', inject([MyservicenameService], (service: MyservicenameService) => {
    expect(service).toBeTruthy();
  }));
});

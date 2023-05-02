import { TestBed } from '@angular/core/testing';

import { MonthapiService } from './monthapi.service';

describe('MonthapiService', () => {
  let service: MonthapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

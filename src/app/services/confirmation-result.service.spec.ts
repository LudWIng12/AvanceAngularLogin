import { TestBed } from '@angular/core/testing';

import { ConfirmationResultService } from './confirmation-result.service';

describe('ConfirmationResultService', () => {
  let service: ConfirmationResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

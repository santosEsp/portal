import { TestBed } from '@angular/core/testing';

import { RecuperaPasswordService } from './recupera-password.service';

describe('RecuperaPasswordService', () => {
  let service: RecuperaPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperaPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

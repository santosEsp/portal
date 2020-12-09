import { TestBed } from '@angular/core/testing';

import { ConfigurarCorreoService } from './configurar-correo.service';

describe('ConfigurarCorreoService', () => {
  let service: ConfigurarCorreoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurarCorreoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

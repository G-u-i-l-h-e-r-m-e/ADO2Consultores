import { TestBed } from '@angular/core/testing';

import { ConsultoresService } from './consultores.service';

describe('ConsultoresService', () => {
  let service: ConsultoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

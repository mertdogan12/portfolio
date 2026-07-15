import { TestBed } from '@angular/core/testing';

import { AktienService } from './aktien-service';

describe('AktienService', () => {
  let service: AktienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AktienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

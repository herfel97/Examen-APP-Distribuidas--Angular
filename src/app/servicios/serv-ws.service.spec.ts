import { TestBed } from '@angular/core/testing';

import { ServWSService } from './serv-ws.service';

describe('ServWSService', () => {
  let service: ServWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

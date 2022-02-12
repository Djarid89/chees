import { TestBed } from '@angular/core/testing';

import { CheesBoxPawnCheesConnectorService } from './chees-box-pawn-chees-connector.service';

describe('CheesBoxPawnCheesConnectorService', () => {
  let service: CheesBoxPawnCheesConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheesBoxPawnCheesConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

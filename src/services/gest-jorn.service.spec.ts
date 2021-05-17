import { TestBed } from '@angular/core/testing';

import { GestJornService } from './gest-jorn.service';

describe('GestJornService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestJornService = TestBed.get(GestJornService);
    expect(service).toBeTruthy();
  });
});

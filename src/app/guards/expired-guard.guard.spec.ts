import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { expiredGuardGuard } from './expiredGuardGuard';

describe('expiredGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => expiredGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

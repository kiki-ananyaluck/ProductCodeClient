import { TestBed } from '@angular/core/testing';

import { ProductCode } from './product-code';

describe('ProductCode', () => {
  let service: ProductCode;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCode);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

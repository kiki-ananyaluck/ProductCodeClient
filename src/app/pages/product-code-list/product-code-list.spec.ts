import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCodeList } from './product-code-list';

describe('ProductCodeList', () => {
  let component: ProductCodeList;
  let fixture: ComponentFixture<ProductCodeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCodeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCodeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

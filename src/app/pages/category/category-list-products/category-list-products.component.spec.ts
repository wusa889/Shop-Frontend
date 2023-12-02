import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListProductsComponent } from './category-list-products.component';

describe('CategoryListProductsComponent', () => {
  let component: CategoryListProductsComponent;
  let fixture: ComponentFixture<CategoryListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryListProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

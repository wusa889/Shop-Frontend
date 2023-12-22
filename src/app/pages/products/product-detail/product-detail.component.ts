import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CategoryControllerService,
  CategoryDetailDto,
  ProductControllerService,
  ProductDetailDto
} from "../../../openapi-client";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'pm-product-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  productId?: number;
  showProduct?: ProductDetailDto;
  displayData: any[] = [];
  imageSource?: string

  constructor(
    private readonly prodService: ProductControllerService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
  }
  // sets the values of the product that is displayed
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      const productId = +params['id']; // The '+' converts the string to a number
      if (productId) {
        this.productId = productId; // Set your component's categoryId property
        this.getProductData(this.productId);
      }
    });
  }
  // function to go back to all products page
  goBack(): void {
    this.router.navigateByUrl('/product/all')
  }

  // gets the data from the product using its ID in the URL
  private getProductData(productId: number) {
    this.prodService.getProductById(productId).subscribe(value => {
      this.showProduct = value;
      this.transformProductData(value);
      this.imageSource = value.image
    });
  }

  // Transforms the product, so it can be displayed vertically instead of everything having its own column
  private transformProductData(product: ProductDetailDto) {
    this.displayData = [
      {key: 'Id', value: product.id},
      {key: 'sku', value: product.sku},
      {key: 'Name', value: product.name},
      {key: 'description', value: product.active},
      {key: 'Active', value: product.active ? 'Yes' : 'No' },
      {key: 'price', value: product.price},
      {key: 'stock', value: product.stock},
      {key: 'category', value: product.category?.name},
    ];
  }
}

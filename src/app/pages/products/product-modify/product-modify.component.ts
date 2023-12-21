import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService, ProductControllerService} from "../../../openapi-client";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'pm-product-modify',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './product-modify.component.html',
  styleUrl: './product-modify.component.scss'
})
export class ProductModifyComponent {
  constructor(
      private readonly prodService: ProductControllerService,
      private route: ActivatedRoute,
      private router: Router
  ) {  }
  myForm = new FormGroup({
    sku: new FormControl<string>("", Validators.required),
    name: new FormControl<string>("", Validators.required),
    image: new FormControl<string>("", Validators.required),
    description: new FormControl<string>("", Validators.required),
    price: new FormControl<number>(0.00, Validators.required),
    stock: new FormControl<number>(0, Validators.required),
    active: new FormControl<boolean>(false, Validators.required)
  })
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const productId = +params['id']; // The '+' converts the string to a number
      if (productId) {
        this.productId = productId; // Set your component's categoryId property
        this.loadProductData(productId);
      }
    });
  }
  productId?: number;

  submit(): void {
    let sku: string = this.myForm.value.sku!;
    let name: string = this.myForm.value.name!;
    let image: string = this.myForm.value.image!;
    let description: string = this.myForm.value.description!;
    let price: number = this.myForm.value.price!;
    let stock: number = this.myForm.value.stock!;
    let active: boolean = this.myForm.value.active!;
    if (this.productId) {
      this.prodService.updateProductById(this.productId, {
        sku: sku,
        name: name,
        image: image,
        description: description,
        price: price,
        stock: stock,
        active: active,
      }).subscribe(value => {
        //put toast message //
        console.log("Product id: " + this.productId + " name: " + name + " Was updated.")
        this.router.navigateByUrl('/product/all')
      });
    } else {
      this.prodService.createProduct({
        sku: sku,
        name: name,
        image: image,
        description: description,
        price: price,
        stock: stock,
        active: active,
      }).subscribe(value => {
        console.log("Product Created")
      })
    }
  }

  loadProductData(productId: number): void {
    this.prodService.getProductById(productId).subscribe( product =>  {
      this.myForm.patchValue({
        sku: product.sku,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        stock: product.stock,
        active: product.active,

      });
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService, ProductControllerService} from "../../../openapi-client";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {error} from "@angular/compiler-cli/src/transformers/util";


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
      private router: Router,
      private toastr: ToastrService
  ) {  }
  myForm = new FormGroup({
    sku: new FormControl<string>("", Validators.required),
    name: new FormControl<string>("", Validators.required),
    image: new FormControl<string>("", Validators.required),
    description: new FormControl<string>("", Validators.required),
    price: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
    stock: new FormControl<number| null>(null,[Validators.required, Validators.pattern(/\d+$/)]),
    active: new FormControl<boolean>(false, Validators.required),
    categoryId: new FormControl<number| null>(null,[Validators.pattern(/\d+$/)])
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
    let categoryId: null | number = this.myForm.value.categoryId!;
    if (this.productId) {
      this.prodService.updateProductById(this.productId, {
        sku: sku,
        name: name,
        image: image,
        description: description,
        price: price,
        stock: stock,
        active: active,
        categoryId: categoryId
      }).subscribe(value => {
        this.router.navigateByUrl('/product/all')
        this.toastr.success('product updated successfully', 'Success', {
          positionClass: 'toast-bottom-center'
        })
      },
        error => {
        this.toastr.error('Category ID not found, please enter valid one or leave empty', 'Failed', {
          positionClass: 'toast-bottom-center'
        })
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
        categoryId: categoryId
      }).subscribe(value => {
        this.router.navigateByUrl('/product/all')
        this.toastr.success('product created successfully', 'Success', {
          positionClass: 'toast-bottom-center'
        })
      },
        error => {
          this.toastr.error('Category ID not found, please enter valid one or leave empty', 'Failed', {
            positionClass: 'toast-bottom-center'})
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
        categoryId: product.category?.id
      });
    });
  }
}

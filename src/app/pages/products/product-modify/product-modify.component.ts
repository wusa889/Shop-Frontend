import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryControllerService, ProductControllerService} from "../../../openapi-client";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";



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
  ) {
  }
  productId?: number;
  myForm = new FormGroup({
    sku: new FormControl<string>("", Validators.required),
    name: new FormControl<string>("", Validators.required),
    image: new FormControl<string>("", Validators.required),
    description: new FormControl<string>("", Validators.required),
    price: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
    stock: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/\d+$/)]),
    active: new FormControl<boolean>(false, Validators.required),
    categoryId: new FormControl<number | null>(null, [Validators.pattern(/\d+$/)])
  })
  //sets initial values and sets productId if there is one in URL
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const productId = +params['id']; // The '+' converts the string to a number
      if (productId) {
        this.productId = productId;
        this.loadProductData(productId);
      }
    });
  }
  // function that is executed when user submits the form
  submit(): void {
    let sku: string = this.myForm.value.sku!;
    let name: string = this.myForm.value.name!;
    let image: string = this.myForm.value.image!;
    let description: string = this.myForm.value.description!;
    let price: number = this.myForm.value.price!;
    let stock: number = this.myForm.value.stock!;
    let active: boolean = this.myForm.value.active!;
    let categoryId: null | number = this.myForm.value.categoryId!;

    //executed when there is a product ID present
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
        //displays toast message when wrong category ID is input
        error => {
          this.toastr.error('Category ID not found, please enter valid one or leave empty', 'Failed', {
            positionClass: 'toast-bottom-center'
          })
        });
    }
    //executed if no product id is present
    else {
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
        // displays toast message when wrong category ID is input
        error => {
          this.toastr.error('Category ID not found, please enter valid one or leave empty', 'Failed', {
            positionClass: 'toast-bottom-center'
          })
        })
    }
  }

  //loads product data so that on edit page everything is already inside right fields
  loadProductData(productId: number): void {
    this.prodService.getProductById(productId).subscribe(product => {
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

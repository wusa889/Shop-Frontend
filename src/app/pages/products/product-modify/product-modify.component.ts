import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService, ProductControllerService} from "../../../openapi-client";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
  selector: 'pm-product-modify',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './product-modify.component.html',
  styleUrl: './product-modify.component.scss'
})
export class ProductModifyComponent {
  constructor(
      private readonly prodService: ProductControllerService
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
  submit(): void{
    let sku: string = this.myForm.value.sku!;
    let name: string = this.myForm.value.name!;
    let image: string = this.myForm.value.image!;
    let description: string = this.myForm.value.description!;
    let price: number = this.myForm.value.price!;
    let stock: number = this.myForm.value.stock!;
    let active: boolean = this.myForm.value.active!;
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

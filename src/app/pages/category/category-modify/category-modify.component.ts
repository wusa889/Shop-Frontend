import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryControllerService, UserControllerService} from "../../../openapi-client";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
interface Actives {
  value: boolean;
  viewValue: string;
}
@Component({
  selector: 'pm-category-modify',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatSlideToggleModule],
  templateUrl: './category-modify.component.html',
  styleUrl: './category-modify.component.scss'
})
export class CategoryModifyComponent {
  selectedValue: boolean | undefined;
  constructor(
      private readonly catService: CategoryControllerService
  ) {
  }

  myForm = new FormGroup({
        isActive: new FormControl<boolean>(false, Validators.required),
        catName: new FormControl<string>("", Validators.required)
      }
  )
  submit(): void{
    console.log(this.myForm.value.catName);
    console.log(this.myForm.value.isActive);
  }
}

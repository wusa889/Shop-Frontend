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
import { ActivatedRoute, Params } from '@angular/router';

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
      private readonly catService: CategoryControllerService,
      private route: ActivatedRoute // Inject ActivatedRoute here
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const categoryId = +params['id']; // The '+' converts the string to a number
      if (categoryId) {
        this.categoryId = categoryId; // Set your component's categoryId property
        this.loadCategoryData(categoryId);
      }
    });
  }
  myForm = new FormGroup({
        isActive: new FormControl<boolean>(false, Validators.required),
        catName: new FormControl<string>("", Validators.required)
      }
  )
  categoryId?: number;

  submit(): void {
    let active = this.myForm.value.isActive!;
    let name = this.myForm.value.catName!;
    if (this.categoryId) {
      this.catService.updateCategoryById(this.categoryId, {
        active: active,
        name: name
      }).subscribe(value =>{
        console.log("Category id: "+ this.categoryId + " name: " + name + " Was updated.")
      });
    } else {
       this.catService.createCategory({
         active: active,
         name: name
       }).subscribe(value => {
         console.log("Category was Created")
       });
    }
  }
  loadCategoryData(categoryId: number): void {
    this.catService.getCategoryById(categoryId).subscribe(category => {
      this.myForm.patchValue({
        isActive: category.active,
        catName: category.name
      });
    });
  }
}

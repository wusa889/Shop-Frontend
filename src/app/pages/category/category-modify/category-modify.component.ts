import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryControllerService, UserControllerService} from "../../../openapi-client";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ActivatedRoute, Params } from '@angular/router';
import {ToastrService} from "ngx-toastr";


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
      private route: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
  ) {
  }
  categoryId?: number;
  myForm = new FormGroup({
      isActive: new FormControl<boolean>(false, Validators.required),
      catName: new FormControl<string>("", Validators.required)
    }
  )
  //sets initial values and sets categoryId if there is one in URL
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const categoryId = +params['id']; // The '+' converts the string to a number
      if (categoryId) {
        this.categoryId = categoryId; // Set your component's categoryId property
        this.loadCategoryData(categoryId);
      }
    });
  }
  // function that is executed when user submits the form
  submit(): void {
    let active = this.myForm.value.isActive!;
    let name = this.myForm.value.catName!;

    //executed when there is a category ID present
    if (this.categoryId) {
      this.catService.updateCategoryById(this.categoryId, {
        active: active,
        name: name
      }).subscribe(value =>{
        this.router.navigateByUrl('/category/all')
        this.toastr.success('category updated successfully', 'Success', {
          positionClass: 'toast-bottom-center'
        })
      }, error => {
        this.toastr.error('Something dumb happened ¯\\_(ツ)_/¯', 'Failed', {
          positionClass: 'toast-bottom-center'
        })
      });

      //executed if no product id is present
    } else {
       this.catService.createCategory({
         active: active,
         name: name
       }).subscribe(value => {
         this.router.navigateByUrl('/category/all')
         this.toastr.success('category created successfully', 'Success', {
           positionClass: 'toast-bottom-center'
         })
       },
         error => {
           this.toastr.error('Something dumb happened ¯\\_(ツ)_/¯', 'Failed', {
             positionClass: 'toast-bottom-center'
           })
         });
    }
  }
  //loads category data so that on edit page everything is already inside right fields
  loadCategoryData(categoryId: number): void {
    this.catService.getCategoryById(categoryId).subscribe(category => {
      this.myForm.patchValue({
        isActive: category.active,
        catName: category.name
      });
    });
  }
}

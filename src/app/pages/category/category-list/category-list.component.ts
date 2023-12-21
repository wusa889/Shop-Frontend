import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService, CategoryShowDto} from "../../../openapi-client";
import {Observable} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'pm-category-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories: CategoryShowDto[] = [];
  displayedColumns: string[] = ['name', 'action']; // Add more column names as needed

  constructor(
      private readonly catService: CategoryControllerService,
      private router: Router

  ) {  }

  ngOnInit(): void {
    this.showCategories();
  }
  showCategories(): void {
    this.catService.getAllCategories().subscribe(value => {
      this.categories = value;
    });
  }
  goToEditPage(id: number) {
    this.router.navigate(['/category/edit', id]).then(r => false);
  }
  deleteCategory(id: number){
    this.catService.deleteCategoryById(id).subscribe(value => {
      console.log("Category was deleted")
      this.showCategories()
    },
      error => {
      if (error.status === 403) {
        console.log("Authentication Error please login again")
        this.router.navigateByUrl('/auth/login');
      }
      else{
        console.log("Something dumb happend, please try again")
      }
      }
    )
  }



}

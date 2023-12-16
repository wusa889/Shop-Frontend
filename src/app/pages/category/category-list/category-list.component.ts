import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService, CategoryShowDto} from "../../../openapi-client";
import {Observable} from "rxjs";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'pm-category-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories: CategoryShowDto[] = [];
  displayedColumns: string[] = ['name']; // Add more column names as needed

  constructor(
    private readonly catService: CategoryControllerService

  ) {  }

  ngOnInit(): void {
    this.showCategories();
  }
  showCategories(): void {
    this.catService.getAllCategories().subscribe(value => {
      this.categories = value;
    });
  }



}

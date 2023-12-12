import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService} from "../../../openapi-client";

@Component({
  selector: 'pm-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  constructor(
    private readonly catService: CategoryControllerService
  ) {
  }
  showCategories(): void{
    this.catService.getAllCategories().subscribe(value => {
      console.log(value)
    })
  }

}

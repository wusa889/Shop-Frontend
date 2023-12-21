import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService, CategoryDetailDto} from "../../../openapi-client";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'pm-category-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {
  categoryId?: number;
  showCategory?: CategoryDetailDto;
  displayData: any[] = [];
  constructor(
    private readonly catService: CategoryControllerService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      const categoryId = +params['id']; // The '+' converts the string to a number
      if (categoryId) {
        this.categoryId = categoryId; // Set your component's categoryId property
        this.getCategoryData(this.categoryId);
      }
    });
  }
  goBack(): void{
    this.router.navigateByUrl('/category/all')
  }
  getCategoryData(catId: number): void {
    this.catService.getCategoryById(catId).subscribe(value => {
      this.showCategory = value;
      this.transformCategoryData(value);
    });
  }

  transformCategoryData(category: CategoryDetailDto) {
    this.displayData = [
      { key: 'Id:', value: category.id },
      { key: 'Active:', value: category.active ? 'Yes' : 'No' },
      { key: 'Name:', value: category.name },
      { key: 'Products:', value: category.products.map(p => p.name).join(', ') }
    ];
  }


}

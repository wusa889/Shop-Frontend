import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryControllerService, CategoryShowDto} from "../../../openapi-client";
import {Observable, Subscription} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";
import {IsAdminDirective} from "../../../directives/is-admin.directive";
import {LoginComponent} from "../../auth/login/login.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'pm-category-list',
  standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, IsAdminDirective],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories: CategoryShowDto[] = [];
  displayedColumns: string[] = ['name', 'action'];

  private adminRoleSubscription: Subscription;
  constructor(
      private readonly catService: CategoryControllerService,
      private router: Router

  ) {this.adminRoleSubscription = LoginComponent.onLoginChange.subscribe((isLoggedIn) => {
    this.updateDisplayedColumns();
  });
  }

  ngOnInit(): void {
    this.updateDisplayedColumns();
    this.showCategories(); // Fetch and display categories
    this.adminRoleSubscription = LoginComponent.onLoginChange.subscribe(() => {
      this.updateDisplayedColumns();
      this.showCategories(); // Re-fetch and display categories if login status changes
    });
  }
  ngOnDestroy() {
    if (this.adminRoleSubscription) {
      this.adminRoleSubscription.unsubscribe();
    }
  }
  showCategories(): void {
    this.catService.getAllCategories().subscribe(value => {
      this.categories = value;
    });
  }
  goToEditPage(id: number) {
    this.router.navigate(['/category/edit', id]).then(r => false);
  }
  goToDetailPage(id: number) {
    this.router.navigate(['/category/detail', id]).then(r => false);
  }

  private updateDisplayedColumns() {
    this.displayedColumns = this.checkAdminRole() ? ['name', 'action'] : ['name'];
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
        console.log("Something dumb happened, please try again")
      }
      }
    )
  }
  private checkAdminRole(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      return false; // No token means not logged in or session expired
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles && decodedToken.roles.includes('admin');
    } catch (error) {
      console.error('Error decoding token', error);
      return false;
    }
  }
}

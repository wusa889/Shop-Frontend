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
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";

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
      private router: Router,
      private tostr: ToastrService
  ) {this.adminRoleSubscription = LoginComponent.onLoginChange.subscribe((isLoggedIn) => {
    this.updateDisplayedColumns();
  });
  }
  //sets initial values and checks if user is admin
  ngOnInit(): void {
    this.updateDisplayedColumns();
    this.showCategories(); // Fetch and display categories
    this.adminRoleSubscription = LoginComponent.onLoginChange.subscribe(() => {
      this.updateDisplayedColumns();
      this.showCategories(); // Re-fetch and display categories if login status changes
    });
  }
  //checks on leave of admin is still logged in and if not unsubs to adminRoleSub
  ngOnDestroy() {
    if (this.adminRoleSubscription) {
      this.adminRoleSubscription.unsubscribe();
    }
  }
  // Adds the categories that will be shown to categories Array
  showCategories(): void {
    this.catService.getAllCategories().subscribe(value => {
      this.categories = value;
    });
  }
  // Function to get to the edit page of a category
  goToEditPage(id: number) {
    this.router.navigate(['/category/edit', id]).then(r => false);
  }
  // Function to get to the detail page of a category
  goToDetailPage(id: number) {
    this.router.navigate(['/category/detail', id]).then(r => false);
  }
  // updates display columns according to admin or no admin
  private updateDisplayedColumns() {
    this.displayedColumns = this.checkAdminRole() ? ['name', 'action'] : ['name'];
  }
  // deletes category if user is logged in as admin and confirms SWAL dialog
  // sends user to login page if not logged in as admin
  deleteCategory(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked 'Yes', proceed with deletion
        this.catService.deleteCategoryById(id).subscribe(value => {
            this.tostr.success('Product deleted successfully', 'Success', {
              positionClass: 'toast-bottom-center'})
            this.showCategories();
          },
          error => {
            if (error.status === 403) {
              this.tostr.error('Not Authorized', 'Failed', {
                positionClass: 'toast-bottom-center'
              })
              this.router.navigateByUrl('/auth/login');
            } else {
              this.tostr.error('Something dumb happened ¯\\_(ツ)_/¯', 'Failed', {
                positionClass: 'toast-bottom-center'
              })
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked 'Cancel'
        this.tostr.info('Delete cancelled', 'Cancelled', {
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
  // Function to check if logged-in user is admin
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

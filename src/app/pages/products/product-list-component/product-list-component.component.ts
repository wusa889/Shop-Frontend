import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductControllerService, ProductShowDto} from "../../../openapi-client";
import {Router} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {LoginComponent} from "../../auth/login/login.component";
import {jwtDecode} from "jwt-decode";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import * as sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";
@Component({
  selector: 'pm-product-list-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './product-list-component.component.html',
  styleUrl: './product-list-component.component.scss'
})
export class ProductListComponentComponent {
  products: ProductShowDto[] = [];
  displayedColumns: string[] = ['id', 'name', 'stock', 'price', 'sku', 'action']
  private adminRoleSubscription: Subscription;

  constructor(
    private readonly prodService: ProductControllerService,
    private router: Router,
    private tostr: ToastrService
  ) {this.adminRoleSubscription = LoginComponent.onLoginChange.subscribe((isLoggedIn) => {
    this.updateDisplayedColumns();
  });  }
  //sets initial values and checks if admin is logged in
  ngOnInit(): void {
    this.updateDisplayedColumns();
    this.showProducts();
    this.adminRoleSubscription = LoginComponent.onLoginChange.subscribe( () => {
      this.updateDisplayedColumns();
      this.showProducts();
    })
  }
  //checks on leave of admin is still logged in and if not unsubs to adminRoleSub
  ngOnDestroy() {
    if (this.adminRoleSubscription) {
      this.adminRoleSubscription.unsubscribe();
    }
  }
  // Adds the products that will be shown to products Array
  private showProducts() {
    this.prodService.getAllProducts().subscribe(value => {
      this.products = value;
    });
  }
  // Function to get to the edit page of a product
  goToEditPage(id: number) {
    this.router.navigate(['/product/edit', id]).then(r => false);
  }
  // Function to get to the detail page of a product
  goToDetailPage(id: number){
    this.router.navigate(['/product/detail', id]).then(r => false);
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
  // updates display columns according to logged-in user
  private updateDisplayedColumns() {
    this.displayedColumns = this.checkAdminRole() ? ['id', 'name', 'stock', 'price', 'sku', 'action'] : ['id', 'name', 'stock', 'price', 'sku'];
  }
  // deletes product if user is logged in as admin, if not sends to login page
  deleteProduct(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked 'Yes'
        this.prodService.deleteProductById(id).subscribe(value => {
          this.tostr.success('Product deleted successfully', 'Success', {
            positionClass: 'toast-bottom-center'
          });
          this.showProducts();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked 'Cancel'
        this.tostr.info('Delete cancelled', 'Cancelled', {
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }
}

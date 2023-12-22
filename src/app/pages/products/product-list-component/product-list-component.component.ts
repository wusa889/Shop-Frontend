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

  ngOnInit(): void {
    this.updateDisplayedColumns();
    this.showProducts();
    this.adminRoleSubscription = LoginComponent.onLoginChange.subscribe( () => {
      this.updateDisplayedColumns();
      this.showProducts();
    })
  }
  ngOnDestroy() {
    if (this.adminRoleSubscription) {
      this.adminRoleSubscription.unsubscribe();
    }
  }
  private showProducts() {
    this.prodService.getAllProducts().subscribe(value => {
      this.products = value;
    });
  }
  goToEditPage(id: number) {
    this.router.navigate(['/product/edit', id]).then(r => false);
  }
  goToDetailPage(id: number){
    this.router.navigate(['/product/detail', id]).then(r => false);
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
  private updateDisplayedColumns() {
    this.displayedColumns = this.checkAdminRole() ? ['id', 'name', 'stock', 'price', 'sku', 'action'] : ['id', 'name', 'stock', 'price', 'sku'];
  }
  deleteProduct(id: number){
    this.prodService.deleteProductById(id).subscribe(value => {
      this.tostr.success('Product deleted successfully', 'Success', {
        positionClass: 'toast-bottom-center'
      })
      this.showProducts()
    },
      error => {
      if (error.status === 403) {
        console.log("Authentication Error please login again")
        this.tostr.error("please login again", "Failed", {
          positionClass: 'toast-bottom-center'
        })
        this.router.navigateByUrl('/auth/login');
      }
      else{
        this.tostr.error("Something dumb happened ¯\\_(ツ)_/¯", "Failed", {
          positionClass: 'toast-bottom-center'
      })
      }
      }
    )
  }
}

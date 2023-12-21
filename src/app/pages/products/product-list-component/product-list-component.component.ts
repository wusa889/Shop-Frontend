import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductControllerService, ProductShowDto} from "../../../openapi-client";
import {Router} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

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


  constructor(
    private readonly prodService: ProductControllerService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.showProducts();
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

  deleteProduct(id: number){
    this.prodService.deleteProductById(id).subscribe(value => {
      console.log("product was deleted.")
      this.showProducts()
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

import { Routes } from '@angular/router';
import {isAdminGuard} from "./guards/is-admin.guard";

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login.component').then(val => val.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/auth/register/register.component').then(val => val.RegisterComponent)
  },
  {
    path: 'product/all',
    loadComponent: () =>
      import('./pages/products/product-list-component/product-list-component.component').then(val => val.ProductListComponentComponent)
  },
  {
    path: 'product/modify',
    loadComponent: () =>
      import('./pages/products/product-modify/product-modify.component').then(val => val.ProductModifyComponent),
    canActivate: [isAdminGuard]
  },
  {
    path: 'product/create',
    loadComponent: () =>
      import('./pages/products/product-modify/product-modify.component').then(val => val.ProductModifyComponent),
    canActivate: [isAdminGuard]
  },
  {
    path: 'product/detail',
    loadComponent: () =>
      import('./pages/products/product-detail/product-detail.component').then(val => val.ProductDetailComponent)
  },
  {
    path: 'product/delete',
    loadComponent: () =>
      import('./pages/products/product-delete/product-delete.component').then(val => val.ProductDeleteComponent),
    canActivate: [isAdminGuard]
  },
  {
    path: 'category/all',
    loadComponent: () =>
      import('./pages/category/category-list/category-list.component').then(val => val.CategoryListComponent)
  },
  {
    path: 'category/detail',
    loadComponent: () =>
      import('./pages/category/category-list/category-list.component').then(val => val.CategoryListComponent)
  },
  {
    path: 'category/create',
    loadComponent: () =>
      import('./pages/category/category-modify/category-modify.component').then(val => val.CategoryModifyComponent),
    canActivate: [isAdminGuard]
  },
  {
    path: 'category/edit',
    loadComponent: () =>
      import('./pages/category/category-modify/category-modify.component').then(val => val.CategoryModifyComponent),
    canActivate: [isAdminGuard]
  },
  {
    path: 'category/delete',
    loadComponent: () =>
      import('./pages/category/category-delete/category-delete.component').then(val => val.CategoryDeleteComponent),
    canActivate: [isAdminGuard]
  },
  {
    path: 'category/list',
    loadComponent: () =>
      import('./pages/category/category-list-products/category-list-products.component').then(val => val.CategoryListProductsComponent)
  }

];

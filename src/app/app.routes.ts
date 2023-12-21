import { Routes } from '@angular/router';
import {isAdminGuard} from "./guards/is-admin.guard";
import {expiredGuardGuard} from "./guards/expiredGuardGuard";
import {AllUserComponent} from "./pages/user/all-user/all-user.component";

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
    path: 'product/edit/:id',
    loadComponent: () =>
      import('./pages/products/product-modify/product-modify.component').then(val => val.ProductModifyComponent),
    canActivate: [expiredGuardGuard, isAdminGuard]
  },
  {
    path: 'product/create',
    loadComponent: () =>
      import('./pages/products/product-modify/product-modify.component').then(val => val.ProductModifyComponent),
    canActivate: [expiredGuardGuard, isAdminGuard]
  },
  {
    path: 'product/detail/:id',
    loadComponent: () =>
      import('./pages/products/product-detail/product-detail.component').then(val => val.ProductDetailComponent)
  },
  {
    path: 'category/all',
    loadComponent: () =>
      import('./pages/category/category-list/category-list.component').then(val => val.CategoryListComponent)
  },
  {
    path: 'category/detail/:id',
    loadComponent: () =>
      import('./pages/category/category-detail/category-detail.component').then(val => val.CategoryDetailComponent)
  },
  {
    path: 'category/create',
    loadComponent: () =>
      import('./pages/category/category-modify/category-modify.component').then(val => val.CategoryModifyComponent),
    canActivate: [expiredGuardGuard, isAdminGuard]
  },
  {
    path: 'category/edit/:id',
    loadComponent: () =>
      import('./pages/category/category-modify/category-modify.component').then(val => val.CategoryModifyComponent),
    canActivate: [expiredGuardGuard, isAdminGuard]
  },
  {
    path: 'users/all',
    loadComponent: () =>
      import('./pages/user/all-user/all-user.component').then(val => val.AllUserComponent),
    canActivate: [expiredGuardGuard, isAdminGuard]
  },
];

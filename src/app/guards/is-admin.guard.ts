import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {ProductManagerJWTPayload} from "./product-manager-j-w-t.payload";


export const isAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  console.log(localStorage.getItem("ACCESS_TOKEN"))
  function isAdmin():boolean{

    if(localStorage.getItem("ACCESS_TOKEN") === null){
      return false
    }
    const token = localStorage.getItem("ACCESS_TOKEN");
    const decode = jwtDecode<ProductManagerJWTPayload>(token!);
    return decode.roles.includes('admin');
  }
  if(localStorage.getItem("ACCESS_TOKEN")&& isAdmin()){
    return true;
  }
  router.navigateByUrl('/auth/login')
  return false;
};

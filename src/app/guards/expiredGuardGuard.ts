import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {ProductManagerJWTPayload} from "./product-manager-j-w-t.payload";

export const expiredGuardGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    function isExpired(): boolean {
        let token: string = localStorage.getItem("ACCESS_TOKEN")!;
        let check: boolean = false
        if (!token) {
            check = true;
        }

        const decode = jwtDecode<ProductManagerJWTPayload>(token!);
        if (decode.exp && decode.exp < (new Date().getTime() / 1000)) check = true
        return check;
    }
    try {
        if(!isExpired()){
            return true;
        }
        if(isExpired()){
            console.log("Token is expired please login again")
            router.navigateByUrl("/auth/login").then(r => {return false});
            return false;
        }
        else{
            console.log("Token is expired please login again")
            router.navigateByUrl("/auth/login").then(r => {return false});
            return false;
        }

    }
    catch (e){
        router.navigateByUrl("/auth/login").then(r => {return false});
        return false
    }
}

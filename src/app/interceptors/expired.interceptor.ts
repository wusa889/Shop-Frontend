import {HttpInterceptorFn} from '@angular/common/http';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {ProductManagerJWTPayload} from "../guards/product-manager-j-w-t.payload";



export const expiredInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        const decode = jwtDecode<ProductManagerJWTPayload>(token);
        const currentTimeInSeconds = new Date().getTime() / 1000;
        if (decode.exp && decode.exp < currentTimeInSeconds) {
            // Token is expired, remove it from local storage
            localStorage.removeItem("ACCESS_TOKEN");

            // Clone the request without the Authorization header
            const clonedRequest = req.clone({
                headers: req.headers.delete('Authorization')
            });
            return next(clonedRequest);
        }

        // Token is valid, proceed with setting the Authorization header
        return next(req.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        }));
    }

    // No token present, just proceed with the request
    return next(req);
};


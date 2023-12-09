import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem("ACCESS_TOKEN")) {
    return next(req.clone ({
      setHeaders: {
        'Authorization': `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    }));
  }
  return next(req);
};

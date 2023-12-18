import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {ApiModule, Configuration} from "./openapi-client";
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {authorizationInterceptor} from "./interceptors/authorization.interceptor";
import {expiredInterceptor} from "./interceptors/expired.interceptor";


export const appConfig: ApplicationConfig = {
        providers: [provideRouter(routes),
            provideAnimations(),
            provideHttpClient(
                withInterceptors([
                    expiredInterceptor,
                    authorizationInterceptor,
                ])
            ),
            importProvidersFrom(
                ApiModule.forRoot(() => {
                    return new Configuration({
                        basePath: 'https://product-manager.cyrotech.ch'
                    })
                })
            )
        ]
    }
;

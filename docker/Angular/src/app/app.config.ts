import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigurationLoader } from './configuration/config.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { unaAuthorizedInterceptor } from './autentication/middle-ware/http-unauthorized.interceptor';
export function initializerFn(appConfigService: ConfigurationLoader) {
  return () => {
    return appConfigService.loadAppConfig();
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([unaAuthorizedInterceptor])),
    ConfigurationLoader,
        {
        provide: APP_INITIALIZER,
        multi: true,
        deps: [ConfigurationLoader],
        useFactory: initializerFn
        }, 
        provideAnimationsAsync(), 
        provideAnimationsAsync(),
        provideToastr({
          positionClass: 'toast-bottom-right',
        }),
  ]
};

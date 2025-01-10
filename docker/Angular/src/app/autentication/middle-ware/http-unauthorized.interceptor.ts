import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/authentication.service';

export const unaAuthorizedInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const accessToken = cookieService.get('accesstoken');
  const clonedRequest = addAuthorizationHeader(req, accessToken);

  return next(clonedRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !req.url.includes('users/token/refresh/')) {
        // Handle token refresh if 401 error and not already refreshing
        const refreshToken = cookieService.get('refreshtoken');
        if (!refreshToken) {
          // Logout user if refresh token is missing
          // authService.logout();
          return throwError(() => new Error('No refresh token available'));
        }

        // Call refresh token API and retry the original request
        return authService.refreshToken({ refresh: refreshToken }).pipe(
          switchMap((tokens: any) => {
            // Save new tokens to cookies
            cookieService.set('accesstoken', tokens.access);
            cookieService.set('refreshtoken', tokens.refresh);

            // Retry the original request with the new access token
            const newRequest = addAuthorizationHeader(req, tokens.access);
            return next(newRequest);
          }),
          catchError((refreshError) => {
            // Logout user if refresh token call fails
            // authService.logout();
            return throwError(() => refreshError);
          })
        );
      }

      // Pass the error if it's not a 401 or refresh attempt fails
      return throwError(() => err);
    })
  );
};

function addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
  if (token) {
    return request.clone({
      headers: new HttpHeaders().set('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + token)
    });
  }
  return request.clone({
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  });
}
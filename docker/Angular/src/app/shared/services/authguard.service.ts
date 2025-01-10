import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    public cookieService: CookieService,
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.cookieService.get('auth') === 'true';
    if (!isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router,
    public cookieService: CookieService,
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.cookieService.get('auth') === 'true';
    if (isAuthenticated) {
      this.router.navigate(['app/project']);
      return false;
    }
    return true;
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule, MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  username : string;
  constructor(
    public route: Router,
    public userData: UserDataService,
    public cookieservice: CookieService
  ) { }

  ngOnInit(): void {
    this.username =  this.cookieservice.get('firstName') + ' ' + this.cookieservice.get('lastName')
  }
  goToProject(){
    this.route.navigate(['app/project']);
  }
  toggleNav(){
    this.userData.userModule.expandNavBar = !this.userData.userModule.expandNavBar
  }
  signOut(){
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
    // this.cookieservice.deleteAll();
    this.route.navigate(['/'])
  }
}

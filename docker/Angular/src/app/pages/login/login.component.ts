import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signInInput : any = {
    email: null,
    password : null
  }
  saving : boolean = false;
  constructor(
    public modal: BsModalRef,
    public _router : Router,
    private _authService : AuthService,
    private _toastrService : ToastrService,
    public cookieService: CookieService,
  ) {
    
  }
  ngOnInit(): void {
    
  }
  applicationSignIn(){
    const data = {
        email : this.signInInput.email,
        password : this.signInInput.password,
    }
    this._authService.signIn(data).subscribe({
      next:(result:any)=>{
        // console.log(result)
        let user = result.data;
        this.cookieService.set('accesstoken', user.access);  
        this.cookieService.set('refreshtoken', user.refresh);
        this.cookieService.set('firstName', user?.user.first_name);
        this.cookieService.set('lastName', user?.user.last_name);
        this.cookieService.set('auth', 'true');
        this.cookieService.set('emailAddress', user?.user.email);
        this._router.navigate(['app/project'])
      },
      error:(error:any)=>{
        this._toastrService.error(error.error.errors,'Error')
      }
    })
  }
}

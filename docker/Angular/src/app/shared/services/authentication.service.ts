import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ConfigurationLoader } from '../../configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: any;
  constructor(configurationLoader: ConfigurationLoader,
    private http: HttpClient) {
    this.apiUrl = configurationLoader.apiBaseUrl().apiUrl;
  }

  getgenders(): Observable<any> {
    const URL = this.apiUrl + 'master/genders';
    return this.http.get(URL);
  }
  signIn(data:any): Observable<any> {
    const URL = this.apiUrl + 'users/signin/';
    return this.http.post(URL,data);
  }
  refreshToken(data:any){
    const URL = this.apiUrl + 'users/token/refresh/';
    return this.http.post(URL,data);
  }
}
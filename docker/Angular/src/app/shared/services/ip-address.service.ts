import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpaddressService {

  constructor(
    private httpBackend: HttpBackend
  ) { }

  getClientIp(): Observable<any> {
    const http = new HttpClient(this.httpBackend);
    return http.get('https://2xdd5jd515.execute-api.us-east-1.amazonaws.com/test');
  }
}

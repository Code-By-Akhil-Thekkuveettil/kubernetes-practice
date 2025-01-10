import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ConfigurationLoader } from '../../configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl: any;
  constructor(configurationLoader: ConfigurationLoader,
    private http: HttpClient) {
    this.apiUrl = configurationLoader.apiBaseUrl().apiUrl;
  }

  getgenders(): Observable<any> {
    const URL = this.apiUrl + 'master/genders';
    return this.http.get(URL);
  }
  addproject(data:any){
    const URL = this.apiUrl + 'project/add-project/';
    return this.http.post(URL,data)
  }
  updateproject(data:any){
    const URL = this.apiUrl + 'project/update-project/';
    return this.http.put(URL,data)
  }
  listProject(){
    const URL = this.apiUrl + 'project/get-projects/';
    return this.http.get(URL)
  }
  addQuotaGroup(data:any){
    const URL = this.apiUrl + 'project/add-quota-group/';
    return this.http.post(URL,data)
  }
  updateQuotaGroup(data:any){
    const URL = this.apiUrl + 'project/update-quota-group/';
    return this.http.put(URL,data)
  }
  listQuotaGroupByProject(data:any){
    const URL = this.apiUrl + 'project/get-project-quota-group?project_token='+data.project_token;
    return this.http.get(URL)
  }
  listClient(){
    const URL = this.apiUrl + 'project/list-clients/';
    return this.http.get(URL)
  }
  listManagers(){
    const URL = this.apiUrl + 'project/list-managers/';
    return this.http.get(URL)
  }
  deleteproject(data:any){
    const URL = this.apiUrl + 'project/delete-project/';
    return this.http.post(URL,data)
  }
  deleteQuota(data:any){
    const URL = this.apiUrl + 'project/delete-quota-group/';
    return this.http.post(URL,data)
  }
  getProjectDetails(token:any){
    const URL = this.apiUrl + 'project/get-project-details/?token='+token;
    return this.http.get(URL);
  }
  getQuotaDetailByToken(token:any){
    const URL = this.apiUrl + 'project/get-quota-group-details/?token='+token;
    return this.http.get(URL);
  }
}

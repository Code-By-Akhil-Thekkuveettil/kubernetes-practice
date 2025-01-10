import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ConfigurationLoader } from '../../configuration/config.service';
// import { ConfigurationLoader } from 'src/app/configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  apiUrl: any;
  constructor(configurationLoader: ConfigurationLoader,
    private http: HttpClient) {
    this.apiUrl = configurationLoader.apiBaseUrl().apiUrl;
  }

  getgenders(): Observable<any> {
    const URL = this.apiUrl + 'master/genders';
    return this.http.get(URL);
  }
  getProfession(): Observable<any> {
    const URL = this.apiUrl + 'master/professions';
    return this.http.get(URL);
  }
  getDegrees(): Observable<any> {
    const URL = this.apiUrl + 'master/education_degrees';
    return this.http.get(URL);
  }
  getBoardCerfitified(): Observable<any> {
    const URL = this.apiUrl + 'master/board_certified_eligibles';
    return this.http.get(URL);
  }
  getNursesDegree(): Observable<any> {
    const URL = this.apiUrl + 'master/nurse_degrees';
    return this.http.get(URL);
  }
  getEmployeeFacilityType(): Observable<any> {
    const URL = this.apiUrl + 'master/employer_facility_types';
    return this.http.get(URL);
  }
  getHosptialType(): Observable<any> {
    const URL = this.apiUrl + 'master/hospital_types';
    return this.http.get(URL);
  }
  getClinicType(): Observable<any> {
    const URL = this.apiUrl + 'master/clinic_types';
    return this.http.get(URL);
  }
  getLabType(): Observable<any> {
    const URL = this.apiUrl + 'master/laboratory_types';
    return this.http.get(URL);
  }
  getInsuranceType(): Observable<any> {
    const URL = this.apiUrl + 'master/insurance_types';
    return this.http.get(URL);
  }
  getMedicalSpecialites(): Observable<any> {
    const URL = this.apiUrl + 'master/medical_specialities';
    return this.http.get(URL);
  }
  getNursesSpecialites(): Observable<any> {
    const URL = this.apiUrl + 'master/nurses_specialities';
    return this.http.get(URL);
  }
  getdiseaseList(): Observable<any> {
    const URL = this.apiUrl + 'master/disease_list';
    return this.http.get(URL);
  }
  addHCPPanelMember(data:any){
    const URL = this.apiUrl + 'panel/add/hcp/member/';
    return this.http.post(URL,data)
  }
  updateHCPPanelMember(data:any){
    const URL = this.apiUrl + 'panel/update/hcp/member/';
    return this.http.put(URL,data)
  }
  stateList(id:any){
    const URL = this.apiUrl + 'master/states/'+id;
    return this.http.get(URL);
  }
  countryList(){
    const URL = this.apiUrl + 'master/countries';
    return this.http.get(URL);
  }

  createSubPanel(data:any){
    const URL = this.apiUrl + 'panel/add/sub-panel/';
    return this.http.post(URL,data)
  }
  addSubPanelMemeber(data:any,queryparams:any){
    let params = new HttpParams();

    for (const key in queryparams) {
      if (queryparams.hasOwnProperty(key)) {
        params = params.set(key, queryparams[key]);
      }
    }
    const URL = this.apiUrl + 'panel/add/sub-panel/members/';
    return this.http.post(URL,data,{params})
  }
  getPanelList(){
    const URL = this.apiUrl + 'panel/view/';
    return this.http.get(URL);
  }
  // validateEmail
  verifyWorkEmail(data:any){
    const URL = this.apiUrl + 'verification/generate-otp/';
    return this.http.post(URL,data)
  }

  validateWorkEmailOTP(data:any){
    const URL = this.apiUrl + 'verification/verify-otp/';
    return this.http.post(URL,data)
  }

  getSubPanelList(data:any){
    const URL = this.apiUrl + 'panel/get/sub-panels/';
    return this.http.get(URL,{params:data});
  }
  saveSearchPerference(data:any){
    const URL = this.apiUrl + 'panel/add/saved-search/';
    return this.http.post(URL,data)
  }
  viewSearchPerference(data:any){
    const URL = this.apiUrl + 'panel/get/saved-search/';
    return this.http.post(URL,data)
  }


  // /panel/get/invitation-email/
  getEmailTemplate(){
    const URL = this.apiUrl + 'panel/get/invitation-email/';
    return this.http.get(URL);
  }
  sendEmailInvitation(data:any){
    const URL = this.apiUrl + 'panel/send/invitation/';
    return this.http.post(URL,data)
  }

  previewPanelInvitation(data:any){
    const URL = this.apiUrl + 'project/invitation-preview/';
    return this.http.post(URL,data)
  }

  updateSubPanel(data:any){
    const URL = this.apiUrl + 'panel/update/sub-panel/';
    return this.http.put(URL,data)
  }
  unsubscribePanel(data:any){
   const URL = this.apiUrl + 'panel/unsubscribe/';
    return this.http.post(URL,data)
  }
  rejectstudy(data:any){
    const URL = this.apiUrl + 'panel/unsubscribe/selection/';
    return this.http.post(URL,data)
  }


  addorUpdatePanelMember(data:any){
    const URL = this.apiUrl + 'panel/add/panel/member/';
    return this.http.post(URL,data)
  }
}

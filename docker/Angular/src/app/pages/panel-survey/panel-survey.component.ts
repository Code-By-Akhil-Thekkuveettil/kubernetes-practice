import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { PanelService } from '../../shared/services/panel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxCurrencyDirective } from 'ngx-currency';
import { IpaddressService } from '../../shared/services/ip-address.service';

@Component({
  selector: 'app-panel-survey',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,NgxCurrencyDirective
  ],
  templateUrl: './panel-survey.component.html',
  styleUrl: './panel-survey.component.css'
})
export class PanelSurveyComponent {
acceptPrivacy : any ;
step :  number = 1;
showVerifyOTP : boolean = false;
panelData: any = {
  firstname : '',
  lastname :'',
  email : '',
  workemail :'',
  profession : null,
  professionName : '',
  otherProfession:'',
  degree: [],
  degreeName : [],
  otherdegree:'',
  primaryMedicalSpeciality :null,
  primaryMedicalSpecialityname :'',
  otherprimaryMedicalSpecialityname :'',
  yearstartedWorking : null,
  NPInumber : '',
  NHSNumber : '',
  gender :null,
  gendername :'',
  othergendername :'',
  yearofBirth :null,
  workStreet : '',
  workTownorCity : '',
  workState:null,
  workStatename :'',
  workCountry: null,
  workCountryname :'',
  workZipcode: '',
  homeStreet : '',
  homeTownorCity : '',
  homeState:null,
  homeStateName :'',
  homecountryName : '',
  homeCountry: null,
  homeZipcode: '',
  phoneNumber : '',
  workphone:'',
  faxnumber:'',
  eFaxNumber : '',
  secondaryMedicalSpecialities : '',
  stateIssuedMedicalLicenseNumber : '',
  ismedicalLicenseValid : null,
  isBoardCertified : null,
  isBoardCertifiedname : '',
  nursingDegree:[],
  nursingDegreename:[],
  othernursingDegreename: '',
  nursingspeciality:null,
  nursingspecialityname:'',
  othernursingspeciality:null,
  nursingsubspeciality:'',
  isManagementLevelRole:'',
  jobTitle : '',
  diseaseSepecialization : [],
  diseaseSepecializationname : [],
  otherdiseaseSepecialization : '',
  employeeFacilityType :[],
  employeeFacilityTypename :[],
  otheremployeeFacilityTypename: '',
  hospitalType :[],
  hospitalTypename :[],
  otherhospitalTypename : '',
  clinictype:null,
  clinictypename :'',
  otherclinictypename :'',
  laborotaryType :null,
  laborotaryTypename :'',
  otherlaborotaryTypename :'',
  bedCount : '',
  hospitalcount: '',
  employeeCount : '',
  orgName :'',
  insurancetype :[],
  insurancetypename :[],
  otherinsurancetypename: '',
  hasPaypal : '',
  paypalEmailAddress : '',
  allowdateforResearch : '',
  acceptInvitation: null
};
degrees: any = [];
professionData :any = [];
boardCertifiedoptions: any= [];
nursedegrees: any= [];
employeeFacilityTypes: any= [];
hosptialTypes: any= [];
clinicTypes: any= [];
laboratoryTypes: any= [];
insuranceTypes: any= [];
medicalspecalityData: any= [];
nurseSpecialityData: any= [];
diseaseData: any= [];
genders :any = [];
years: any = [];
currentYear = new Date().getFullYear();
employeeFacilityType :string = '';

ispanelAdded : boolean ;
panelMemberToken : string;
stateList :any = [];
homestateList :any = [];
countryList : any = [];
token: string | null = null;
emailVerified : boolean = false;
otp : any;
emailValidationtoken : any;

selectedNPIOption: any;
selectedNHSOption : any;
selectedBedCount: any;
selectedHospitalCount : any;
ipaddress : any;
constructor(
  private _activatedRoute: ActivatedRoute,
  public _panelService : PanelService,
  public _router : Router,
  private _toastrService : ToastrService,
  private _ipAddressService : IpaddressService
) {
  const startYear = 1960;
  const endYear = this.currentYear + 10;
  this.years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return { id: year, name: year };
  });
}
ngOnInit(){
  this.getIP()
  this._activatedRoute.queryParamMap.subscribe((params) => {
    this.token = params.get('token');
  });
  this.getGender();
  this.getprofession();
  this.getDegrees();
  this.getBoardCerfitified();
  this.getNursesDegree();
  this.getEmployeeFacilityType();
  this.getHosptialType();
  this.getClinicType();
  this.getLabType();
  this.getInsuranceType();
  this.getMedicalSpecialites();
  this.getNursesSpecialites();
  this.getdiseaseList();
  this.getCountryList()
}
getStateList(id:any){
  this._panelService.stateList(id).subscribe((data:any)=> {
    this.stateList = data.data;
  })
}
getCountryList(){
  this._panelService.countryList().subscribe((data:any)=> {
    this.countryList = data.data;
  })
}
getGender(){
  this._panelService.getgenders().subscribe((data:any) => {
    this.genders =  data.data;
  })
}
getprofession(){
  this._panelService.getProfession().subscribe((data:any)=> {
    this.professionData = data.data;
  })
}
getDegrees(){
  this._panelService.getDegrees().subscribe((data:any)=> {
    this.degrees = data.data;
  })
}
getBoardCerfitified(){
  this._panelService.getBoardCerfitified().subscribe((data:any)=> {
    this.boardCertifiedoptions = data.data;
  })
}
getNursesDegree(){
  this._panelService.getNursesDegree().subscribe((data:any)=> {
    this.nursedegrees = data.data;
  })
}
getEmployeeFacilityType(){
  this._panelService.getEmployeeFacilityType().subscribe((data:any)=> {
    this.employeeFacilityTypes = data.data;
  })
}
getHosptialType(){
  this._panelService.getHosptialType().subscribe((data:any)=> {
    this.hosptialTypes = data.data;
  })
}
getClinicType(){
  this._panelService.getClinicType().subscribe((data:any)=> {
    this.clinicTypes = data.data;
  })
}
getLabType(){
  this._panelService.getLabType().subscribe((data:any)=> {
    this.laboratoryTypes = data.data;
  })
}
getInsuranceType(){
  this._panelService.getInsuranceType().subscribe((data:any)=> {
    this.insuranceTypes = data.data;
  })
}
getMedicalSpecialites(){
  this._panelService.getMedicalSpecialites().subscribe((data:any)=> {
    this.medicalspecalityData = data.data;
  })
}
getNursesSpecialites(){
  this._panelService.getNursesSpecialites().subscribe((data:any)=> {
    this.nurseSpecialityData = data.data;
  })
}
getdiseaseList(){
  this._panelService.getdiseaseList().subscribe((data:any)=> {
    this.diseaseData = data.data;
  })
}
nextStep(step : any){
  window.scrollTo(0,0)
  if(this.acceptPrivacy == 'no'){
    this.step = 0;
    const data = {
      panel_token: this.token,
      // email : this.panelData.workemail,
      // first_name : this.panelData.firstname,
      // last_name : this.panelData.lastname,
      ip_address :this.ipaddress,
      privacy_policy : false,
      hcp_member_token : null
    }
    this._panelService.addorUpdatePanelMember(data).subscribe({

    });
  }
  if(this.acceptPrivacy == 'yes'){
    if(step == 2){
      if(this.showVerifyOTP) { 
        this.validateOTP();
      }
      else{
        if(!this.emailVerified){
          this.addPanelMember();
        }
        else{
          this.step = step + 1;
        }
      }
    }
    else{
      this.step = step + 1;
    }
  }
  
}
prevStep(step: any){
  window.scrollTo(0,0)
  this.step = step-1;
}
keyPressNumbersWithDecimal(event: { which: any; keyCode: any; preventDefault: () => void; }) {
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }
  return true;
}
  onprofessionChange(profession :any){
    this.panelData.professionName = profession.name;
  }
  ondegreeChange(degree :any){
    this.panelData.degreeName = [];
    degree?.forEach((item : any)=>{
      if(item.id != 14) this.panelData.degreeName.push(item.name);
    })
  }
  onprimaryMedicalSpecialityChange(type :any){
    this.panelData.primaryMedicalSpecialityname = type.name;
  }
  ongenderChange(type :any){
    this.panelData.gendername = type.name;
  }
  onboardChange(type :any){
    this.panelData.isBoardCertifiedname = type.name;
  }
  onNursingDegreeChange(type :any){
    this.panelData.nursingDegreename = [];
    type?.forEach((item : any)=>{
      if(item.id != 5) this.panelData.nursingDegreename.push(item.name);
    })
  }
  onNursingspecialityChange(type :any){
    this.panelData.nursingspecialityname = type.name;
  }
  onEmployeeFacilityTypeChange(type: any) {
    this.employeeFacilityType = ''
    this.panelData.employeeFacilityTypename = []
    type?.forEach((item:any) => {
      if(this.employeeFacilityType == ''){
        this.employeeFacilityType = item.name;
      }
      else{
        this.employeeFacilityType = this.employeeFacilityType + ', ' + item.name
      }
      if(item.id != 14){
        this.panelData.employeeFacilityTypename.push(item.name);
      } 
    })
  }
  onDiseaseSpecialisationyChange(type :any){
    this.panelData.diseaseSepecializationname = [];
    type?.forEach((item : any)=>{
      if(item.id != 421) this.panelData.diseaseSepecializationname.push(item.name);

    })
  }
  onHospitalTypeChange(type :any){
    this.panelData.hospitalTypename = [];
    type?.forEach((item : any)=>{
      if(item.id != 18) this.panelData.hospitalTypename.push(item.name);
    })
  }
  onClinicTypeChange(type :any){
    this.panelData.clinictypename = type.name;
  }
  onlabTypeChange(type :any){
    this.panelData.laborotaryTypename = type.name;
  }
  onInsuranceTypeChange(type :any){
    this.panelData.insurancetypename = [];
    type?.forEach((item : any)=>{
      if(item.id != 5) this.panelData.insurancetypename.push(item.name);
    })
  }
  onstateChange(type :any){
    this.panelData.workStatename = type.name;
  }
  onCountryChange(type :any){
    this.panelData.workCountryname = type.name;
    this.panelData.workState = null;
    this.getStateList(type.id);
  }
  onhomestateChange(type :any){
    this.panelData.homeStateName = type.name;
  }
  onhomeCountryChange(type :any){
    this.panelData.homecountryName = type.name;
    this.panelData.homeState = null;
    this._panelService.stateList(type.id).subscribe((data:any) =>{
      this.homestateList =  data.data
    })
  }
  addPanelMember(){
    // gAAAAABnQDZQDx9gfDkg8PeWiJ0n19h9Nq7OIqzWaADnCGDAHx6UC6l726cclbcQGI8YwTBpV7uEwa0c_YmErZOONeALJnil-g==
    const data = {
      panel_token: this.token,
      email : this.panelData.workemail,
      first_name : this.panelData.firstname,
      last_name : this.panelData.lastname,
      ip_address :this.ipaddress,
      privacy_policy : true,
      hcp_member_token : null
    }
    this._panelService.addorUpdatePanelMember(data).subscribe({
      next: (result: any) => {
        this.ispanelAdded = true;
      this.panelMemberToken = result.data?.token;
      if(!this.emailVerified){
        this.verifyWorkEmailAddress();
      }
      else{
        this.step = this.step + 1;
      }
      
        // this._toastrService.error(result.data,'Success')
      },
      error: (error: any) => {
        this._toastrService.error(error.error.errors,'Error')
      }
    })
  }
  addOtherOption(){
    if(this.panelData.degree.includes(14)) {
      this.panelData.degreeName.push(this.panelData.otherdegree)
    }
    if(this.panelData.nursingDegree.includes(5) ){
      this.panelData.nursingDegreename.push(this.panelData.othernursingDegreename);
    } 
    if(this.panelData.diseaseSepecialization.includes(421) ){
      this.panelData.diseaseSepecializationname.push(this.panelData.otherdiseaseSepecialization)
    }
    if(this.panelData.employeeFacilityType.includes(14)) {
      this.panelData.employeeFacilityTypename.push(this.panelData.otheremployeeFacilityTypename)
    }
    if(this.panelData.hospitalType.includes(18) ){
      this.panelData.hospitalTypename.push(this.panelData.otherhospitalTypename);
    } 
    if(this.panelData.insurancetype.includes(5) ){
      this.panelData.insurancetypename.push(this.panelData.otherinsurancetypename)
    }
    
  }
  updatePanelMember(){
    this.addOtherOption();
    const data = {
      panel_token : this.token,
      hcp_member_token: this.panelMemberToken,
      first_name : this.panelData.firstname,
      last_name : this.panelData.lastname,
      email : this.panelData.workemail,
      private_email_address :this.panelData.email,
      gender : this.panelData.gender ==  5 ? this.panelData.othergendername : this.panelData.gendername,
      birth_year : this.panelData.yearofBirth,
      personal_street_address : this.panelData.homeStreet,
      personal_city : this.panelData.homeTownorCity,
      personal_state : this.panelData.homeStateName,
      personal_country : this.panelData.homecountryName,
      personal_zip : this.panelData.homeZipcode,
      work_street_address : this.panelData.workStreet,
      work_city : this.panelData.workTownorCity,
      work_state : this.panelData.workStatename,
      work_country : this.panelData.workCountryname,
      work_zip : this.panelData.workZipcode,
      cell_phone : this.panelData.phoneNumber,
      office_phone : this.panelData.workphone,
      fax_number : this.panelData.faxnumber,
      e_fax : this.panelData.eFaxNumber,
      profession : this.panelData.profession ==  18 ? this.panelData.otherProfession:  this.panelData.professionName,
      education_degree : this.panelData.degreeName,
      medical_speciality : this.panelData.primaryMedicalSpeciality ==  181 ? this.panelData.otherprimaryMedicalSpecialityname:  this.panelData.primaryMedicalSpecialityname,
      year_first_worked_at_profession : this.panelData.year,
      npi_number : (this.selectedNHSOption == 'numeric' || this.selectedNPIOption == 'numeric') ? this.panelData.NPInumber : '',
      subspecialty : this.panelData.secondaryMedicalSpecialities,
      medical_license_number : this.panelData.stateIssuedMedicalLicenseNumber,
      medical_license_valid : this.panelData.ismedicalLicenseValid ? this.panelData.ismedicalLicenseValid : false,
      board_certified_eligible : this.panelData.isBoardCertifiedname,
      nurse_degree :   this.panelData.nursingDegreename,
      nursing_speciality :  this.panelData.nursingspecialityname ==  45 ? this.panelData.othernursingspeciality:  this.panelData.nursingspecialityname,
      nursing_sub_specialty : this.panelData.nursingsubspeciality,
      have_management_level_role : this.panelData.isManagementLevelRole,
      job_title : this.panelData.jobTitle,
      disease_speciality :  this.panelData.diseaseSepecializationname,
      employer_facility_type : this.panelData.employeeFacilityTypename,
      hospital_type : this.panelData.hospitalTypename,
      clinic_type : this.panelData.clinictype ==  12 ? this.panelData.otherclinictypename:  this.panelData.clinictypename,
      laboratory_type : this.panelData.laborotaryType ==  10 ? this.panelData.otherlaborotaryTypename:  this.panelData.laborotaryTypename,
      total_bed_count : this.selectedBedCount == 'numeric' ? this.panelData.bedCount : '',
      number_of_hospitals :  this.selectedHospitalCount =='numeric' ? this.panelData.hospitalcount : '',
      number_of_employees : this.panelData.employeeCount,
      insurance_type : this.panelData.insurancetypename, 
      employerName : this.panelData.orgName,
      willing_to_provide_diagnosis_proof  : this.panelData.allowdateforResearch,
      receive_market_research_invitations  : this.panelData.acceptInvitation
        }
    this._panelService.addorUpdatePanelMember(data).subscribe(data =>{
      this.step = 8;
    })
  }
  verifyWorkEmailAddress(){
    const data = {
      email : this.panelData.workemail,
      panel_token : this.token
    }
    this._panelService.verifyWorkEmail(data).subscribe({
      next: (result: any) => {
        this.emailValidationtoken = result.data?.verification_token;
        this.showVerifyOTP = true;
        // this._toastrService.error(result.data,'Success')
      },
      error: (error: any) => {
        this._toastrService.error(error.error.data,'Error')
      }
    })
  }
  validateOTP(){
    const data = {
      otp: this.otp,
      verification_token: this.emailValidationtoken,
      hcp_panel_memberId: this.panelMemberToken,
      // hcp_panel_memberId: "gAAAAABnUoOdIv8BPHZi0Mm5UbSz8cvWAG5Tt_dTQhezKS167G8Vyh2u7wCRaEan1OBKutuABed1fcNQDd2CnHFi1rlgnrNeFw==",
      // verificaction_token :"9cf78672-a9c1-4099-b4b2-67f9cff40dd5",
    }
    this._panelService.validateWorkEmailOTP(data).subscribe(
      {
        next: (result: any) => {
          this.emailVerified = true;
          this.showVerifyOTP = false;
          this._toastrService.success(result.data,'Success')
          this.step =  this.step + 1;
        },
        error: (error: any) => {
          this.emailVerified = false;
          this.step =  2;
          this._toastrService.error(error.error.data,'Error')
        }
      });
  }
  getIP(){
    this._ipAddressService.getClientIp().subscribe((data:any)=>{
      this.ipaddress = data.sourceIP;
    })
  }
}

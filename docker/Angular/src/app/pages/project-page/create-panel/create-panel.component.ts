import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PanelService } from '../../../shared/services/panel.service';
import { ProjectService } from '../../../shared/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuillModule } from 'ngx-quill';
@Component({
  selector: 'app-create-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatExpansionModule,
    QuillModule
  ],
  templateUrl: './create-panel.component.html',
  styleUrl: './create-panel.component.css'
})
export class CreatePanelComponent {
  countryList : any = [];
  degrees: any = [];
  stateList :any = [];
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
  panelInput : any= {
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
    }
    employeeFacilityType : any;
    projectDetails : any = [];
    token:any;
    panelList: any = [];
    panelId:any;
    subPanel :any = {
      panel: null,
      project_token : null,
      name : 'New Selection',
      country: null,
      invites_required : null,
      subpanel_token:null,
      memebersMatched: 0
  }
  subPanelList : any ;
  showAddSelection : boolean = true;
  selectedSubPanel : any;

  constructor(
    public modal: BsModalRef,
    public _router : Router,
    private _projectService :ProjectService,
    private _panelService : PanelService,
    private _toastrService : ToastrService,
    private _activatedRoute: ActivatedRoute,
  ) {
    
  }
  ngOnInit(): void {
    this.token = this._activatedRoute.snapshot.paramMap.get('token')!
    this.getProjectDetails(this.token);
    this.getPanelLists()
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
  keyPressNumbersWithDecimal(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  getStateList(id:any){
    // this.panelInput.homeState = null;
    // this.panelInput.workState = null;
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
  getProjectDetails(id:any){
    this._projectService.getProjectDetails(id).subscribe({
      next: (result: any) => {
      this.projectDetails = result.data
      this.getSubPanels();
      },
      error: (error: any) => {
       this._toastrService.error(error.error.errors,'Error')
      }
    });
  }
  getPanelLists(){
    this._panelService.getPanelList().subscribe((result:any) =>{
      this.panelList = result.data
    })
  }

  
  applySubpanel(){
    if(!this.subPanel.panel || !this.panelInput.workCountry){
      this._toastrService.error('Please select Panel and Country to continue');
      return;
    }
    if(!this.subPanel.subpanel_token){
      const data = {
        panel_token: this.subPanel.panel,
        project_token : this.projectDetails.token,
        name : this.subPanel.name,
        country: this.panelInput.workCountry,
        invites_required : this.subPanel.invites_required,
      }
      this._panelService.createSubPanel(data).subscribe((result:any) => {
        this.addMmebersToSubPanel(result.data);
        // this.savePanelSearch(result.data)
        this.getSubPanels();
        this.selectedSubPanel = result.data;
        this.subPanel.subpanel_token = this.selectedSubPanel;
      })
    }
    else{
      this.addMmebersToSubPanel(this.subPanel.subpanel_token);
    }
  }
  addMmebersToSubPanel(id:any){
    const data = {
      panel_token: this.subPanel.panel,
      project_token : this.projectDetails.token,
      sub_panel_token : id
    }
    const paramData = {
      profession : this.panelInput.profession ==  18 ? this.panelInput.otherProfession :  this.panelInput.professionName,
      education_degree : this.panelInput.degreeName,
      medical_speciality : this.panelInput.primaryMedicalSpeciality ==  181 ? this.panelInput.otherprimaryMedicalSpecialityname:  this.panelInput.primaryMedicalSpecialityname,
      year_first_worked_at_profession : this.panelInput.year,
      npi_number : this.panelInput.NPInumber,
      nhs_number : this.panelInput.NHSNumber,
      subspecialty : this.panelInput.secondaryMedicalSpecialities,
      medical_license_number : this.panelInput.stateIssuedMedicalLicenseNumber,
      medical_license_valid : this.panelInput.ismedicalLicenseValid ,
      board_certified_eligible : this.panelInput.isBoardCertifiedname,
      nurse_degree :   this.panelInput.nursingDegreename,
      nursing_speciality :  this.panelInput.nursingspecialityname ==  45 ? this.panelInput.othernursingspeciality:  this.panelInput.nursingspecialityname,
      nursing_sub_specialty : this.panelInput.nursingsubspeciality,
      have_management_level_role : this.panelInput.isManagementLevelRole,
      job_title : this.panelInput.jobTitle,
      disease_speciality :  this.panelInput.diseaseSepecializationname,
      employer_facility_type : this.panelInput.employeeFacilityTypename,
      hospital_type : this.panelInput.hospitalTypename,
      clinic_type : this.panelInput.clinictype ==  12 ? this.panelInput.otherclinictypename:  this.panelInput.clinictypename,
      laboratory_type : this.panelInput.laborotaryType ==  10 ? this.panelInput.otherlaborotaryTypename:  this.panelInput.laborotaryTypename,
      total_bed_count : this.panelInput.bedCount,
      number_of_hospitals : this.panelInput.hospitalcount,
      number_of_employees : this.panelInput.employeeCount,
      insurance_type : this.panelInput.insurancetypename, 
      employerName : this.panelInput.orgName,
      work_country : this.panelInput.workCountryname,
    }
    // console.log(paramData)
    this._panelService.addSubPanelMemeber(data,paramData).subscribe((result :any) => {

          this.subPanel.memebersMatched = result?.count;
          this.savePanelSearch(id)
    })
  }

  onprofessionChange(profession :any){
    this.panelInput.professionName = profession.name;
  }
  ondegreeChange(degree :any){
    this.panelInput.degreeName = [];
    degree?.forEach((item : any)=>{
      if(item.id != 14) this.panelInput.degreeName.push(item.name);
    })
  }
  onprimaryMedicalSpecialityChange(type :any){
    this.panelInput.primaryMedicalSpecialityname = type.name;
  }
  ongenderChange(type :any){
    this.panelInput.gendername = type.name;
  }
  onboardChange(type :any){
    this.panelInput.isBoardCertifiedname = type.name;
  }
  onNursingDegreeChange(type :any){
    this.panelInput.nursingDegreename = [];
    type?.forEach((item : any)=>{
      if(item.id != 5) this.panelInput.nursingDegreename.push(item.name);
    })
  }
  onNursingspecialityChange(type :any){
    this.panelInput.nursingspecialityname = type.name;
  }
  onEmployeeFacilityTypeChange(type: any) {
    this.employeeFacilityType = ''
    this.panelInput.employeeFacilityTypename = []
    type?.forEach((item:any) => {
       this.employeeFacilityType = this.employeeFacilityType + ',' + item.name
      if(item.id != 14){
        this.panelInput.employeeFacilityTypename.push(item.name);
      } 
    })
  }
  onDiseaseSpecialisationyChange(type :any){
    this.panelInput.diseaseSepecializationname = [];
    type?.forEach((item : any)=>{
      if(item.id != 421) this.panelInput.diseaseSepecializationname.push(item.name);

    })
  }
  onHospitalTypeChange(type :any){
    this.panelInput.hospitalTypename = [];
    type?.forEach((item : any)=>{
      if(item.id != 18) this.panelInput.hospitalTypename.push(item.name);
    })
  }
  onClinicTypeChange(type :any){
    this.panelInput.clinictypename = type.name;
  }
  onlabTypeChange(type :any){
    this.panelInput.laborotaryTypename = type.name;
  }
  onInsuranceTypeChange(type :any){
    this.panelInput.insurancetypename = [];
    type?.forEach((item : any)=>{
      if(item.id != 5) this.panelInput.insurancetypename.push(item.name);
    })
  }
  onstateChange(type :any){
    this.panelInput.workStatename = type.name;
  }
  onCountryChange(type :any){
    this.panelInput.workCountryname = type.name;
    this.getStateList(type.id);
  }
  onhomestateChange(type :any){
    this.panelInput.homeStateName = type.name;
  }
  getSubPanels(){
    const data = {
      project_token : this.projectDetails.token
    }
    this._panelService.getSubPanelList(data).subscribe((result:any) => {
      this.subPanelList = result.data;
      this.showAddSelection = this.subPanelList && this.subPanelList.length > 0 ? false : true;
    })
  }
  savePanelSearch(subpaneltoken:any){
    const data = {
      project_token : this.token,
      subpanel_token : subpaneltoken,
      search_params : this.panelInput
   }
  //  console.log(data)
   this._panelService.saveSearchPerference(data).subscribe((result:any)=> {

   })
  }
  getSavedSearch(){
    const data ={
      subpanel_token :  this.selectedSubPanel
    }
    this._panelService.viewSearchPerference(data).subscribe((result:any) => {
        let savedData = result.data?.search_params;
        if(savedData) {
          this.panelInput = savedData
        }
        // console.log(this.panelInput)
    })
  }
  subpanelChanges(event:any){
    if(event){
      this.getSavedSearch();
      this.subPanel.subpanel_token =  event.token;
      this.subPanel.name =  event.name;
      this.subPanel.invites_required = event.invites_required;
      this.subPanel.memebersMatched = event.member_count;
      this.subPanel.panel =event.panel_token;
      this.panelInput.workCountry =  event.country;
    }
    else{
      this.resetsubPanel();
    }
  }
  resetsubPanel(){
    this.subPanel.name = null;
    this.subPanel.panel= null,
    this.subPanel.project_token = null,
    this.subPanel.name = '',
    this.panelInput.workCountry= null,
    this.subPanel.invites_required = null,
    this.subPanel.subpanel_token=null;
    this.subPanel.memebersMatched = 0;
    this.selectedSubPanel = null;
  }
  gotoPanelInvitation(){
    const data = {
      panel_token: this.subPanel.panel,
      project_token : this.projectDetails.token,
      name : this.subPanel.name,
      country: this.panelInput.workCountry,
      invites_required : this.subPanel.invites_required,
      sub_panel_token : this.subPanel.subpanel_token,
    }
    this._panelService.updateSubPanel(data).subscribe((result:any)=>{})
    this._router.navigate(['app/panel-invitation',this.subPanel.subpanel_token,this.projectDetails.token])
    // this._router.navigate(['panel-invitation'], { queryParams: { stoken:this.subPanel.subpanel_token, ptoken:this.projectDetails.token } })
  }
  goToProject(){
    this._router.navigate(['app/project']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProjectService } from '../../../shared/services/project.service';
import { PanelService } from '../../../shared/services/panel.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-add-quota-group',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxCurrencyDirective
  ],
  templateUrl: './add-quota-group.component.html',
  styleUrl: './add-quota-group.component.css'
})
export class AddQuotaGroupComponent {
  quotainput = {
    name : '',
    status : null,
    notes : null,
    CPI : null,
    incentives : null,
    interviews : null,
    country : null,
    token:null
  }
  onClose :any;
  projectid :any;
  projectype : any;
  countryList : any = [];
  quotaToken: any;
  saving : boolean = false;
  constructor(
    public modal: BsModalRef,
    public _router : Router,
    private _projectService :ProjectService,
    private _panelService : PanelService,
    private _toastrService : ToastrService
  ) {
    
  }
  ngOnInit(): void {
    if(this.quotaToken){
      this.getQuotaDetails(this.quotaToken)
    }
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
  getCountryList(){
    this._panelService.countryList().subscribe((data:any)=> {
      this.countryList = data.data;
    })
  }
  close(){
    this.onClose('Cancel');
    this.modal.hide()
  }
  addQuota(){
    if(this.quotaToken){
      const data = {
        token:this.quotainput.token,
        project_token : this.projectid,
        name : this.quotainput.name,
        country :  this.quotainput.country,
        interviews :  Number(this.quotainput.interviews),
        CPI :  Number(this.quotainput.CPI),
        incentives : Number(this.quotainput.incentives),
        notes :  this.quotainput.notes,
        status :  this.quotainput.status
      }
      this.saving = true;
     this._projectService.updateQuotaGroup(data).subscribe((result:any) =>{
      this._toastrService.success('Quota group updated succesfully','Success')
      this.close();
      this.saving = false;
     })
    }
    else{
      const data = [{
        project_token : this.projectid,
        name : this.quotainput.name,
        country :  this.quotainput.country,
        interviews :  Number(this.quotainput.interviews),
        CPI :  Number(this.quotainput.CPI),
        incentives : Number(this.quotainput.incentives),
        notes :  this.quotainput.notes,
        status :  'active'
      }]
      this.saving = true;
     this._projectService.addQuotaGroup(data).subscribe((result:any) =>{
      this._toastrService.success('Quota group created succesfully','Success')
      this.close();
      this.saving = false;
     })
    }
  }
  getQuotaDetails(token:any){
    this._projectService.getQuotaDetailByToken(token).subscribe((result:any)=>{
        this.quotainput.name = result.data.name
        this.quotainput.status = result.data.status
        this.quotainput.interviews = result.data.interviews
        this.quotainput.CPI = result.data.CPI;
        this.quotainput.incentives = result.data.incentives
        this.quotainput.notes = result.data.notes
        this.quotainput.country = result.data.country,
        this.quotainput.token =  result.data.token
    })
  }
}

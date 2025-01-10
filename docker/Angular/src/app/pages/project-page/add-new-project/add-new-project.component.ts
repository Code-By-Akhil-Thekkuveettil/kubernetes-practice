import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddQuotaGroupComponent } from '../add-quota-group/add-quota-group.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../shared/services/project.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-new-project',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [BsModalService], 
  templateUrl: './add-new-project.component.html',
  styleUrl: './add-new-project.component.css'
})
export class AddNewProjectComponent{
  projectData = {
    name : '',
    clientid : null,
    clientProjectCode : null,
    alternativeProjectCode : null,
    projectType : null,
    leadManagerId : null,
    salesManagerId : null
  }
  clientlist : any[]=[];
  managerlist : any[]=[];
  projectmanagerlist : any[]=[];
  currentTab : string = 'tab1';
  projectid : any;
  quotaList : any = []; 
  managers: any[]= [];
  projectmangers : any = [];

  quotadeleting : boolean = false;
  saving: boolean = false;
    constructor(
    private _modalService: BsModalService,
    public _router : Router,
    private _projectService :ProjectService,
    private _toastrService : ToastrService,
    private _activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    
  }
  ngOnInit(): void {
    let token = this._activatedRoute.snapshot.paramMap.get('token')!
    if(token) {
      this.getProjectDetails(token);
    }
    else{
      this.getClients();
      this.getManagers();
    }
  }
  getProjectDetails(token:any){
    this._projectService.getProjectDetails(token).subscribe({
      next: (result: any) => {
        if(result.data){
          this.projectData.name = result.data.name;
          this.projectData.alternativeProjectCode = result.data.alternate_project_code;
          this.projectData.clientProjectCode = result.data.client_project_code;
          this.projectData.projectType = result.data.project_type;
          this.projectid = result.data.token
          this.projectData.clientid = result.data.client_token;
          this.projectData.leadManagerId = result.data.lead_project_manager_token;
          this.projectData.salesManagerId = result.data.lead_sales_manager_token;
          this.projectmangers = result.data.project_managers;
          this.getClients();
          this.getManagers();
        }
      },
      error: (error: any) => {
       this._toastrService.error(error.error.errors,'Error')
      }
    });
  }
  addQuotaGroup(){
    let createQuota: BsModalRef;
    createQuota = this._modalService.show(AddQuotaGroupComponent,{ class: 'modal-lg',initialState: {projectid: this.projectid,projectype :this.projectData.projectType}});
      createQuota.content.onClose = () => {
       this.getQuotaList();
    };
  }
  editQuotaGroup(token:any){
    let createQuota: BsModalRef;
    createQuota = this._modalService.show(AddQuotaGroupComponent,{ class: 'modal-lg',initialState: {projectid: this.projectid,projectype :this.projectData.projectType,quotaToken:token}});
      createQuota.content.onClose = () => {
       this.getQuotaList();
    };
  }
  addProject(){
    if(!this.projectid){
      const data = {
      name : this.projectData.name,
      client_token : this.projectData.clientid,
      client_project_code : this.projectData.clientProjectCode,
      alternate_project_code : this.projectData.alternativeProjectCode,
      project_type : this.projectData.projectType
      }
      this.saving = true;
      this._projectService.addproject(data).subscribe({
        next: (result: any) => {
          this.saving = false;
          this.projectid = result.data;
          // this._toastrService.success('Project created succesfully','Success')
          this.changeTab('tab2')
          this.getQuotaList();
        },
        error: (error: any) => {
          this.saving = false;
         this._toastrService.error(error.error.errors,'Error')
        }
      });
    }
    else{
      this.changeTab('tab2')
      this.getQuotaList();
    }
  }
  getClients(){
    this._projectService.listClient().subscribe((result:any) => {
      this.clientlist = result.data
    })
  }
  getManagers(){
    this._projectService.listManagers().subscribe((result:any) => {
      this.managerlist = result.data
      this.projectmanagerlist = result.data;
      const selectedTokens = new Set(this.projectmangers?.map((mngr: any) => mngr.token));
      this.projectmanagerlist.forEach(item => {
          item.selected = selectedTokens.has(item.token);
      });
      this.managers = this.projectmanagerlist.filter(manager => manager.selected);
    })
  }
  changeTab(tab:string){
    // console.log(this.managerlist);console.log(this.projectmanagerlist)
    this.currentTab =  tab  
  }
  updateProject(){
    let selectedmanagers:any = [];
    this.managers.forEach((item:any) =>{
       selectedmanagers.push(item.token) 
    })
    let status = this.quotaList?.length > 0 ? 'open' :  'setup'
    const data = {
      token : this.projectid,
      lead_project_manager_token :this.projectData.leadManagerId,
      lead_sales_manager_token : this.projectData.salesManagerId,
      project_managers_token : selectedmanagers,
      status : status,
      name : this.projectData.name,
      client_token : this.projectData.clientid,
      client_project_code : this.projectData.clientProjectCode,
      alternate_project_code : this.projectData.alternativeProjectCode,
      project_type : this.projectData.projectType
   }
   this.saving = true;
   this._projectService.updateproject(data).subscribe({
    next: (result: any) => {
      this.changeTab('tab3')
      this.saving = false;
    },
    error: (error: any) => {
      this.saving = false;
     this._toastrService.error(error.error.errors,'Error')
    }
  });
  }
  getQuotaList(){
    const data = {
      project_token :  this.projectid
    }
    this._projectService.listQuotaGroupByProject(data).subscribe((result:any) => {
      this.quotaList = result.data
    })
  }
  backtoProjects(){
    this.updateProject()
    this._toastrService.success('Project updated succesfully','Success')
    this._router.navigate(['app/project']);
  }
  toggleSelection() {
    this.managers = [];
    this.managers = this.projectmanagerlist.filter(manager => manager.selected);
    if (!this.managers.some(manager => manager.token === this.projectData.leadManagerId)) {
      this.projectData.leadManagerId = null;
    } 
  }
  deleteQuota(id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this quota group?',
      },
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        const data = {
          token:id
        }
        this.quotadeleting = true;
        this._projectService.deleteQuota(data).subscribe({
          next: (result: any) => {
            this.getQuotaList()
            this._toastrService.success(result.data,'Success')
            this.quotadeleting = false;
          },
          error: (error: any) => {
            this.quotadeleting = false;
           this._toastrService.error(error.error.errors,'Error')
          }
        });
      }
      else{

      }
    });
  }
  goToProject(){
    this._router.navigate(['app/project']);
  }
}

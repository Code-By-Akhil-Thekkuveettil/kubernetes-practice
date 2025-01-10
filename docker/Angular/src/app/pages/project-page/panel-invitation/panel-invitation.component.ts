import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuillModule } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { PanelService } from '../../../shared/services/panel.service';
import { ProjectService } from '../../../shared/services/project.service';
import { NgxCurrencyDirective } from 'ngx-currency';
import { CollectTestEmailComponent } from '../../../shared/collect-test-email/collect-test-email.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpsValidatorDirective } from '../../../shared/services/http.validation.directive';

@Component({
  selector: 'app-panel-invitation',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatExpansionModule,QuillModule,
    NgxCurrencyDirective,
    HttpsValidatorDirective],
  templateUrl: './panel-invitation.component.html',
  styleUrl: './panel-invitation.component.css'
})
export class PanelInvitationComponent {

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline','strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ font: [] }, { size: [] }], // Font and size
      [{ color: [] }, { background: [] }], // Text color and background
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
  
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
  
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
  
      ['clean'], // remove formatting button
    ],
  };
  emailContent: string = 'start';
  projectToken : string;
  subPanelToken : string;
  previewPanel : any;
  projectDetails : any;
  subpanel : any;
  quotaGroup : any;
  subPanelMemberCount : any;

  quotaselected : any;
  quotaIncentive : any;
  quotaNote : any;
  panelInput :  any;
  constructor(
    public modal: BsModalRef,
    public _router : Router,
    private _projectService :ProjectService,
    private _panelService : PanelService,
    private _toastrService : ToastrService,
    private _activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    
  }
  ngOnInit(): void {
    this.projectToken = this._activatedRoute.snapshot.paramMap.get('ptoken')!
    this.subPanelToken = this._activatedRoute.snapshot.paramMap.get('stoken')!
    // console.log(this.projectToken,this.subPanelToken)
    this.getTemplate()
    this.getPanelPreview()
    this.getSavedSearch();
  }

  getTemplate(){
    this._panelService.getEmailTemplate().subscribe((data:any) => {
      // console.log(data)
      this.emailContent =  data.data[0]?.body
    })
  }
  getPanelPreview(){
    const data = {
      project_token : this.projectToken,
      subpanel_token : this.subPanelToken
    }
    this._panelService.previewPanelInvitation(data).subscribe({
      next :(result:any)=>{
        this.previewPanel = result.data;
        this.projectDetails = this.previewPanel.project;
        this.subPanelMemberCount = this.previewPanel.sub_panel_members_count;
        this.subpanel = this.previewPanel.subpanel;
        this.quotaGroup = this.previewPanel.quota_group
        let quota =  this.quotaGroup?.[0]
        this.quotaselected = quota.token;
        this.onquotagroupChange(quota)
      },
      error: (error: any) => {

      }
    })
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
  onquotagroupChange(type:any){
    if(type){
      this.quotaIncentive = type.incentives;
      this.quotaNote = type.notes
    }
    else{
      this.quotaIncentive = null;
      this.quotaNote = '';
    }
  }

  getSavedSearch(){
    const data ={
      subpanel_token :  this.subPanelToken
    }
    this._panelService.viewSearchPerference(data).subscribe((result:any) => {
        let savedData = result.data?.search_params;
        if(savedData) {
          this.panelInput = savedData
          // console.log(this.panelInput)
        }
    })
  }
  saveTemplate(){
    const data = {
      sub_panel_token : this.subPanelToken,
      email_topic :this.subpanel.email_topic,
      email_body : this.emailContent,
      email_subject : this.subpanel.email_subject,
      survey_link :this.subpanel.survey_link,
      // survey_link_type :this.subpanel.survey_link_type,
      survey_link_type : "single",
      LOI :this.subpanel.LOI,
      survey_reject_link : 'https://panel-dev.demoap.com/reject-study/',
      incentive :this.quotaIncentive,
      incentive_in_text : this.subpanel.incentive_in_text,
    }
    this._panelService.updateSubPanel(data).subscribe({
      next :(result:any) => {

      },
      error :( error:any) => {

      }
    })
  }
  sendTestEmail(){
    this.saveTemplate()
    const dialogRef = this.dialog.open(CollectTestEmailComponent, {
      width: '400px',
      data: {
        title: 'Enter the Test Email',
        message: 'Enter the test email for sending invitation?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data = {
          project_token : this.projectToken,
          subpanel_token : this.subPanelToken,
          test_email : result  
        }
        this._panelService.sendEmailInvitation(data).subscribe({
          next:(result:any)=>{
            this._toastrService.success('Test email has been sent to the address','Sucess')
          },
          error: (error: any) => {
            this._toastrService.error(error.error.errors,'Error')
          }
        })
      }
      else{
        // this._toastrService.error('Failed to send test email','Error')
      }
    });
}
  sendInvitation(){
    this.saveTemplate()
    const data = {
      project_token : this.projectToken,
      subpanel_token : this.subPanelToken,
    }
    this._panelService.sendEmailInvitation(data).subscribe({
      next:(result:any)=>{
        this._toastrService.success('Email has been sent to the address','Sucess')
      },
      error: (error: any) => {
        this._toastrService.error(error.error.errors,'Error')
       }
    })
  }
  goToProject(){
    this._router.navigate(['app/create-subpanel',this.projectToken]);
  }
}

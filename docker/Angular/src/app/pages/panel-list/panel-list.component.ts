import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PanelService } from '../../shared/services/panel.service';
import { ProjectService } from '../../shared/services/project.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ViewPanelLinkComponent } from '../../shared/view-panel-link/view-panel-link.component';

@Component({
  selector: 'app-panel-list',
  standalone: true,
  imports: [CommonModule],
  providers: [BsModalService], 
  templateUrl: './panel-list.component.html',
  styleUrl: './panel-list.component.css'
})
export class PanelListComponent {
  panelList : any = [];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public modal: BsModalRef,
    public _router : Router,
    private _projectService :ProjectService,
    private _panelService : PanelService,
    private _toastrService : ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _modalService: BsModalService,
  ) {
    
  }
  ngOnInit(): void {
    this.getPanelLists()
  }
  getPanelLists(){
    this._panelService.getPanelList().subscribe((result:any) =>{
      this.panelList = result.data
    })
  }
  sharePanelLink(token:any){
    const route = ['/panel-survey'];
    const queryParams = { token:token };
    const urlTree = this._router.createUrlTree(route, { queryParams });
    let link = this._router.serializeUrl(urlTree);

    let baseUrl = this.document.baseURI;

    let panelsurveylink =  baseUrl+link.substring(1)
    // console.log(panelsurveylink);
    
    let viewPanelLINK: BsModalRef;
    viewPanelLINK = this._modalService.show(ViewPanelLinkComponent,{ class: 'modal-lg',initialState: {surveylink: panelsurveylink}});
    viewPanelLINK.content.onClose = () => {
       
    };
  }
}

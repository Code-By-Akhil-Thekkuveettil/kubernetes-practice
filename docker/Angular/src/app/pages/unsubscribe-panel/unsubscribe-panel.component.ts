import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ToastrService } from 'ngx-toastr';
import { PanelService } from '../../shared/services/panel.service';
import { ProjectService } from '../../shared/services/project.service';

@Component({
  selector: 'app-unsubscribe-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxCurrencyDirective,
    MatButtonModule
  ],
  templateUrl: './unsubscribe-panel.component.html',
  styleUrl: './unsubscribe-panel.component.css'
})
export class UnsubscribePanelComponent {
  panelToken : any;
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
    this.panelToken = this._activatedRoute.snapshot.paramMap.get('token')!
    // console.log(this.panelToken)
  }
  unsubscribeFromPanel(){
    const data = {
      token: this.panelToken
    }
    this._panelService.unsubscribePanel(data).subscribe({
      next:(result :any)=>{
        this._toastrService.success(result.data,'Success');
        this._router.navigate(['/'])
      },
      error:(error : any) => {
        this._toastrService.error(error.error.errors,'Error')
      }
    })
  }
  cancel(){
    this._router.navigate(['/'])
  }
}

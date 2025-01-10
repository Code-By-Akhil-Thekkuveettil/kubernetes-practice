import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-panel-link',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,CommonModule],
  templateUrl: './view-panel-link.component.html',
  styleUrl: './view-panel-link.component.css'
})
export class ViewPanelLinkComponent {
  surveylink : any;
  onClose :any;
  saving : boolean = false;
  constructor(
    public modal: BsModalRef,
    private _toastrService : ToastrService
  ) {}

  copy(): void {
    var textArea = document.createElement("textarea");
    textArea.value = this.surveylink;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    this._toastrService.success('Link copied to clipboard','Success')
    this.onClose('Cancel');
    this.modal.hide()
  }

  onCancel(): void {
    // this.dialogRef.close(false);
    this.onClose('Cancel');
    this.modal.hide()
  }
  close(){
    this.onClose('Cancel');
    this.modal.hide()
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../shared/services/project.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule],
  providers: [BsModalService], 
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent {
  projectlist :any = [];
  projectdeleting : boolean = false;
  constructor(
    public route: Router,
    private _modalService: BsModalService,
    private _projectService : ProjectService,
    private _toastrService : ToastrService,
    private dialog: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
 this.getProjectList()
  }
  goToProject(){
    this.route.navigate(['app/project']);
  }
  addProject(){
    this.route.navigate(['app/add-project'])
  }
  getProjectList(){
    this._projectService.listProject().subscribe 
    ({
      next: (result: any) => {

      this.projectlist = result.data
      },
      error: (error: any) => {
       this._toastrService.error(error.error.errors,'Error')
      }
    });
  }
  createPanel(id:any){
    // let createPanel: BsModalRef;
    // createPanel = this._modalService.show(creat,{ class: 'modal-lg',initialState: {}});
    //   createPanel.content.onClose = () => {
       
    //   };
    this.route.navigate(['app/create-subpanel',id])
  }
  deleteProject(id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this project?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data = {
          token:id
        }
        this.projectdeleting = true;
        this._projectService.deleteproject(data).subscribe({
          next: (result: any) => {
            this.getProjectList();
            this._toastrService.success(result.data,'Success')
            this.projectdeleting = false;
          },
          error: (error: any) => {
            this.projectdeleting = true;
           this._toastrService.error(error.error.errors,'Error')
          }
        });
      } else {
        
      }
    });
    
  }
  editProject(token:any){
    this.route.navigate(['app/edit-project',token]);
  }
}

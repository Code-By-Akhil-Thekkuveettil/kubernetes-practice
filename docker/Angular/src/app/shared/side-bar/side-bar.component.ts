import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor(
    public route: Router,
    public userData: UserDataService
  ) { }

  ngOnInit(): void {
 
  }
  gotoProject(){
    this.route.navigate(['app/project']);
  }
  selectMenu(item :any){
    this.route.navigate([item.url]);
    this.userData.userModule.menuList.forEach((data:any)=> {
      if(data.url == item.url){
        data.active = true;
      }
      else{
        data.active = false;
      }
    })
  }
}

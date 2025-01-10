import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor() { }
  userModule = {
    expandNavBar: false,
    menuList: [
      // {
      //   id:1,
      //   name: 'Dashboard',
      //   icon: 'pe-7s-rocket',
      //   active :true,
      //   url: 'app/dashboard'
      // },
      { 
        id:2,
        name: 'Projects',
        icon: 'pe-7s-diamond',
        active :false,
        url: 'app/project'
      },
      { 
        id:3,
        name: 'Panels',
        icon: 'pe-7s-note',
        active :false,
        url: 'app/panel'
      }
    ]
  };
}
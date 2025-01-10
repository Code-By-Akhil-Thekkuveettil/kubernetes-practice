import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { PanelSurveyComponent } from './pages/panel-survey/panel-survey.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { FooterBarComponent } from './shared/footer-bar/footer-bar.component';
import { UserDataService } from './shared/services/user-data.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PanelSurveyComponent,
    SideBarComponent,
    FooterBarComponent,
    TopBarComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
  isPanelRoute: boolean = false;
  constructor(
    public route: Router,
    public userData: UserDataService
  ) { }

  ngOnInit(): void {
    this.route.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.isPanelRoute = !event.url.includes('app') ;
    });
  }
  goToProject(){
    this.route.navigate(['app/project']);
  }
}

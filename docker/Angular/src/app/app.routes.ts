import { Routes } from '@angular/router';
import { PanelSurveyComponent } from './pages/panel-survey/panel-survey.component';
import { AppComponent } from './app.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { AddNewProjectComponent } from './pages/project-page/add-new-project/add-new-project.component';
import { CreatePanelComponent } from './pages/project-page/create-panel/create-panel.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TokenGuard } from './shared/services/auth.guard';
import { PanelInvitationComponent } from './pages/project-page/panel-invitation/panel-invitation.component';
import { PanelListComponent } from './pages/panel-list/panel-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/services/authguard.service';
import { UnsubscribePanelComponent } from './pages/unsubscribe-panel/unsubscribe-panel.component';
import { RejectStudyComponent } from './pages/reject-study/reject-study.component';
import { NoAuthGuard } from './shared/services/no-auth.guard';

export const routes: Routes = [
    { path: 'panel-survey', component: PanelSurveyComponent ,canActivate : [TokenGuard]},
    // { path: 'app/dashboard', component: DashboardComponent ,canActivate : [AuthGuard]},
    { path: 'app/project', component: ProjectPageComponent,canActivate : [AuthGuard]},
    { path: 'app/add-project', component: AddNewProjectComponent ,canActivate : [AuthGuard]},
    { path: 'app/create-subpanel/:token', component: CreatePanelComponent ,canActivate : [AuthGuard]},
    { path: 'app/edit-project/:token', component: AddNewProjectComponent ,canActivate : [AuthGuard]},
    { path: 'app/panel-invitation/:stoken/:ptoken', component: PanelInvitationComponent ,canActivate : [AuthGuard]},
    { path: 'app/panel', component: PanelListComponent,canActivate : [AuthGuard ]},
    { path: '', component: LoginComponent ,canActivate : [NoAuthGuard ]},
    { path: 'unsubscribe-panel/:token', component: UnsubscribePanelComponent },
    { path: 'reject-study/:token', component: RejectStudyComponent }
];

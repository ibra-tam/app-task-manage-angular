import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AuthGuardGuard } from './authorizations/auth-guard.guard';
import { StatTaskComponent } from './stat-task/stat-task.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashbordComponent,
    canActivate: [AuthGuardGuard]},
    {path: 'statistic', component: StatTaskComponent, canActivate: [AuthGuardGuard]},
  {path: 'account', loadChildren:() => import('./account/account.module').then(mod => mod.AccountModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

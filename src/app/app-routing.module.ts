import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashbord', component: DashbordComponent},
  {path: 'account', loadChildren:() => import('./account/account.module').then(mod => mod.AccountModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/route-guard/admin.guard';
import { NormalGuard } from './services/route-guard/normal.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'admin-dashboard',component:DashboardComponent,canActivate:[AdminGuard]},
  {path:'user-dashboard',component:UserDashboardComponent,canActivate:[NormalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

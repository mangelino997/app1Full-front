import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { RolComponent } from './components/rol/rol.component';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'user', component: UserComponent, canActivate:[AuthGuard], data: {roles: ['ROLE_ADMIN']}},
  {path: 'rol', component: RolComponent, canActivate:[AuthGuard]},
  {path: 'error404', component: Error404Component},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

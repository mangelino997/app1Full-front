import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RolComponent } from './components/rol/rol.component';
import { HomeComponent } from './components/home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { InterceptorService } from './interceptors/interceptor.service';
import { RoleService } from './services/role.service';
import { Role } from './models/role';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { Error404Component } from './components/error404/error404.component';
import { MainComponent } from './components/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RolComponent,
    HomeComponent,
    LoginComponent,
    Error404Component,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    }),

  ],
  providers: [
    UserService,
    User,
    RoleService,
    Role,
    LoginService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

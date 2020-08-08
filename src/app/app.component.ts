import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appFullStack1';
  public username: String = null;
  
  constructor(private loginService: LoginService, private authService:AuthService){

    // nos subscribimos al observer, refleja los cambios en el username logueado
    this.authService.getUsernameObs().subscribe(
      res =>{
        console.log(res);
        this.username = res;
      }
    );
  }

  // logout
  public logout(){
    this.loginService.logout();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Define la url base
  private url: string = 'http://localhost:8080';
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  //Realiza el login del usuario
  public login(user) {
    return this.http.post(this.url + '/login', user);
  }

  // realiza el logout
  logout() {

    // limpia toda la autenticacion
    this.authService.clearAuth();
    this.router.navigate(['']);
  }
}

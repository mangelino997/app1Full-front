import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: String = null;
  public username: String = null;
  public roles = [];
  public usernameSubject = new BehaviorSubject(this.username);
  constructor() { }

  setAuth(token){
    this.token = token; 
    // convierto a JSON el decode del JWT
    let decode = JSON.parse(atob(token.split('.')[1])); 
    this.username = decode.sub;
    this.roles = decode.CLAIM_TOKEN.split(',');

    // refresca los nuevos valores
    this.refresh();
  }

  getToken(){
    return this.token;
  }

  getUsername(){
    return this.username;
  }

  getUsernameObs(): Observable<String> {
    return this.usernameSubject.asObservable();
  }

  private refresh() {
    // Emitir los nuevos valores para que todos los que dependan se actualicen.
    this.usernameSubject.next(this.username);
  }

  getRoles(){
    return this.roles;
  }

  clearAuth(){
    this.token = null;
    this.username = null;
    this.roles = [];

    // refresca los cambios en el observer getUsernameObs, para refrescarlo en el login
    this.refresh();
  }
}

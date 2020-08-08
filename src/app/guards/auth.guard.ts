import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public token: String = null;
  public rolesUser = [];
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    this.token = this.authService.getToken();
    this.rolesUser = this.authService.getRoles();

    // verifica si existe un token
    if (this.token) {

      // check if route is restricted by role
      if (route.data.roles) {
        let bandera = null;
        // la funcion "some" es como un foreach pero sale del bucle con un return true
        this.rolesUser.some(function (rolUser) {
          if (route.data.roles.indexOf(rolUser) !== -1) {
            bandera = true;
            return true;
          }
        });

        // if bandera == null role not authorised so redirect to home page
        !bandera ? [bandera = false, this.router.navigate(['home'])] : bandera;
        return bandera;
      } else {
        // authorised so return true
        return true;
      }
    } else {

      // no existe un token redirect to login page
      this.router.navigate(['']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  //Define la url base
  private url: string = 'http://localhost:8080';
  private rolesSubject = new BehaviorSubject([]);
  private roles: any[];
  constructor(public http: HttpClient) { }

  private refresh() {
    // Emitir los nuevos valores para que todos los que dependan se actualicen.
    this.rolesSubject.next(this.roles);
  }

  getRoles(): Observable<any[]> {
    return this.rolesSubject.asObservable();
  }

  //Obtiene la lista de registros
  public listar() {
    this.http.get<any[]>(this.url + '/roles').subscribe(
      res => {
        this.roles = res;
        console.log(res);
        this.refresh();
      },
      err => {
        console.log(err);
      }
    );
  }

  // add role
  public addRole(role) {
    this.http.post(this.url + '/role', role).subscribe(
      res => {
        this.roles = [...this.roles, res];
        this.refresh();
      },
      err => {
        return err;
      }
    );
  }

  // update role
  public updateRole(role) {
    return this.http.put(this.url + '/role/', role).subscribe(
      res => {
        let roleUpdate = res;
        this.roles.map(
          (u, index) =>
            (u.id === role.id ? this.roles[index] = roleUpdate : u)
        )
      }
    );
  }

  // delete role
  public deleteRole(idRole) {
    return this.http.delete<any>(this.url + '/role/' + idRole).subscribe(
      res => {
        this.roles = this.roles.filter(u => u.id != idRole);
        this.refresh();
      }
    );
  }
}

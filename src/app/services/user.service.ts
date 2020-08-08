import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Define la url base
  private url: string = 'http://localhost:8080';
  private usersSubject = new BehaviorSubject([]);
  private users: any[];
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  private refresh() {
    // Emitir los nuevos valores para que todos los que dependan se actualicen.
    this.usersSubject.next(this.users);
  }

  //Obtiene la lista de registros
  public listar() {
    this.http.get<User[]>(this.url + '/usuarios').subscribe(
      res => {
        this.users = res;
        this.refresh();
      },
      err =>{
        console.log(err);
      }
    );
  }

  //Obtiene por username
  public getForUsername(username): Observable<User> {
    return this.http.get<User>(this.url + '/usuario/' + username);
  }

  // add user
  public addUser(user) {
    this.http.post(this.url + '/usuario', user).subscribe(
      res => {
        /**
       * Evitar hacer this.user.push() pues estaríamos modificando los valores directamente,
       * se debe generar un nuevo array !!!!.
       */
      console.log(res);
        this.users = [...this.users, res];
        this.refresh();
      },
      err=>{
        return err;
      }
    );
  }

  // update user
  public updateUser(user) {
    return this.http.put(this.url + '/usuario/', user).subscribe(
      res => {
        let userUpdate = res;
        this.users.map(
          (u, index) =>
            (u.id === user.id ? this.users[index] = userUpdate : u)
        )
      }
    );
  }

  // delete user
  public deleteUser(idUser) {
    return this.http.delete<User>(this.url + '/usuario/' + idUser).subscribe(
      res=>{
        this.users = this.users.filter(u => u.id!=idUser);
        this.refresh();
      }
    );
  }
}

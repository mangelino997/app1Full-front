import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // define el formulario
  public formulario: FormGroup;
  // define el cammpo de repetir contraseña
  public role: FormControl = new FormControl('', Validators.required);
  //Define la pestania actual seleccionada
  public action: string = null;
  // define el soloLectura
  public readOnly: boolean = null;
  // define el usuario a modificar
  public userMod: any = null;
  // define la lista de usuarios
  public users: Observable<any[]>;
  // define la lista de roles
  public roles: Observable<any[]>;
  constructor(private userModel: User, private userService: UserService, 
    private roleService: RoleService) { }

  ngOnInit(): void {
    //Inicializa el formulario
    this.formulario = this.userModel.formulario;
    //Inicializa
    this.users = this.userService.getUsers();
    this.roles = this.roleService.getRoles();
    this.userService.listar();
    this.roleService.listar();
    //Inicia formulario
    this.resetFields();
  }

  // handle add user
  public addUser() {
    this.formulario.get('roles').setValue([this.role.value]);
    console.log(this.formulario.value);
    this.userService.addUser(this.formulario.value);
    this.resetFields();
  }

  // Handle update User
  public handleUpdateUser(user) {
    this.userMod = user;
    this.action = "Actualizar";
    this.formulario.setValue(user);
    this.readOnly = true;
  }

  // update user
  public updateUser() {
    console.log(this.formulario.value);
    try {
      this.userService.updateUser(this.formulario.value);
      this.resetFields();
    } catch (error) {
      console.log(error);
    }

  }

  // handle delete user
  public handleDeleteUser(user) {
    this.userService.deleteUser(user.id);
  }

  //check password
  public checkPassword() {
    if (this.formulario.value.password !== this.formulario.value.confirmPassword) {
      this.formulario.get('confirmPassword').setValue(null);
    }
  }

  // Reset all
  public async resetFields() {
    this.formulario.reset();
    this.userMod = null;
    this.action = "Agregar";
  }
}

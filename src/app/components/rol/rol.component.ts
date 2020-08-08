import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {

  // define el formulario
  public formulario: FormGroup;
  //Define la pestania actual seleccionada
  public action: string = null;
  // define el soloLectura
  public readOnly: boolean = null;
  // define el role a modificar
  public roleMod: any = null;
  // define la lista de roles
  public roles: Observable<any[]>;
  constructor(private roleModel: Role, private roleService: RoleService) { }

  ngOnInit(): void {
    //Inicializa el formulario
    this.formulario = this.roleModel.formulario;
    //Inicializa
    this.roles = this.roleService.getRoles();
    this.roleService.listar();
    //Inicia formulario
    this.resetFields();
  }

  // handle add user
  public addRole() {
    console.log(this.formulario.value);
    this.roleService.addRole(this.formulario.value);
    this.resetFields();
  }

  // Handle update role
  public handleUpdateRole(role) {
    this.roleMod = role;
    this.action = "Actualizar";
    this.formulario.setValue(role);
    this.readOnly = true;
  }

  // update role
  public updateRole() {
    console.log(this.formulario.value);
    try {
      this.roleService.updateRole(this.formulario.value);
      this.resetFields();
    } catch (error) {
      console.log(error);
    }

  }

  // handle delete role
  public handleDeleteRole(role) {
    this.roleService.deleteRole(role.id);
  }
  // Reset all
  public async resetFields() {
    this.formulario.reset();
    this.roleMod = null;
    this.action = "Agregar";
  }
}

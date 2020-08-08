import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor( private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public login() {
    console.log(this.formulario.value);
    this.loginService.login(this.formulario.value).subscribe(
      res=>{
        console.log("logeado!");
        this.toastr.success("Welcome");
      },
      err=>{
        this.toastr.error("Error: user not found");
      }
    );
    
  }
}

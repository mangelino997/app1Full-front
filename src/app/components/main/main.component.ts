import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  username: string = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    console.log(this.username);
  }

  public logout(){
    this.loginService.logout();
  }
}

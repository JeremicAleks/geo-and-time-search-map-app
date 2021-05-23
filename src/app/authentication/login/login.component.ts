import { Component, OnInit } from '@angular/core';
import {Login} from "../../common/model/login.model";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../common/service/authentication.service";
import {TokenService} from "../../common/service/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: Login = new Login();

  constructor(private toastrService: ToastrService,private authenticationService:AuthenticationService,
              private router: Router,private tokenService:TokenService) { }

  ngOnInit(): void {
  }

  onLogin(login: Login) {
    this.authenticationService.getAccessToken(login.username,login.password).subscribe(
      data => {
        this.toastrService.success("Successfully login");
        this.tokenService.saveToken(data.access_token);
        this.router.navigate(['']);
      },error => {
        this.toastrService.error("Wrong credentials!");
      }
    )
  }
  registrationBtn() {
    this.router.navigate(['/registration']);
  }
}

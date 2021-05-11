import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {RegistrationModel} from "../../common/model/registration.model";
import {AuthenticationService} from "../../common/service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationData: RegistrationModel = new RegistrationModel();

  constructor(private toastrService: ToastrService,private authenticationService:AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onRegistration(registrationData: RegistrationModel) {
    this.authenticationService.userRegistration(registrationData).subscribe(
      data => {
        this.toastrService.success("Registration is successful");
        this.router.navigate(['/login'])
      },error => {
        this.toastrService.error('Registration failed');
      }
    )
  }

}

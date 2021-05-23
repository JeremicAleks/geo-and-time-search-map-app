import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-admin-page-navigation',
  templateUrl: './admin-page-navigation.component.html',
  styleUrls: ['./admin-page-navigation.component.css']
})
export class AdminPageNavigationComponent implements OnInit {

  constructor(public authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TokenService} from "../../../service/token.service";

@Component({
  selector: 'app-admin-page-header',
  templateUrl: './admin-page-header.component.html',
  styleUrls: ['./admin-page-header.component.css']
})
export class AdminPageHeaderComponent implements OnInit {


  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
  }


  logoutClicked() {
    this.tokenService.destroyToken();
  }
}

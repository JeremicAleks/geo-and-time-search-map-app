import { Component, OnInit } from '@angular/core';
import {UserListModel} from "../../../model/user-list.model";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {UserEmitModel} from "../../../model/user-emit.model";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../../service/token.service";
import {PageEvent} from "@angular/material/paginator";
import {PageableRequest} from "../../../model/pageable-request.model";

@Component({
  selector: 'app-admin-page-user',
  templateUrl: './admin-page-user.component.html',
  styleUrls: ['./admin-page-user.component.css']
})
export class AdminPageUserComponent implements OnInit {
  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  userList: UserListModel = new UserListModel();

  constructor(private userService: UserService,private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllEnabledUser();
  }

  getAllEnabledUser(){
    let pageableRequest: PageableRequest = new PageableRequest();
    pageableRequest.page= this.pageIndex;
    pageableRequest.size= this.pageSize;
    pageableRequest.flagFilter = true;
    this.userService.getPageableUsers(pageableRequest).subscribe(
      data => {
        this.userList = data.userListDTO;
        this.length = data.totalElements;
      }
    )
  }

  disableUser(event: UserEmitModel) {
    this.userService.disableUser(event.user).subscribe(
      ()=> {
        this.toastrService.success("User is disable")
        this.userList.users.splice(event.i,1);
        this.length -= 1;
      }
    )
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let pageableRequest: PageableRequest = new PageableRequest();
    pageableRequest.page= event.pageIndex;
    pageableRequest.size= event.pageSize;
    pageableRequest.flagFilter =  true;

    this.userService.getPageableUsers(pageableRequest).subscribe(
      data => {
        this.userList = data.userListDTO;
      }
    )
  }

}

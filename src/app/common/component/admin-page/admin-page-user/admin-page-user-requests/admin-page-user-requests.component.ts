import { Component, OnInit } from '@angular/core';
import {UserListModel} from "../../../../model/user-list.model";
import {UserService} from "../../../../service/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {UserEmitModel} from "../../../../model/user-emit.model";
import {PageEvent} from "@angular/material/paginator";
import {PageableRequest} from "../../../../model/pageable-request.model";

@Component({
  selector: 'app-admin-page-user-requests',
  templateUrl: './admin-page-user-requests.component.html',
  styleUrls: ['./admin-page-user-requests.component.css']
})
export class AdminPageUserRequestsComponent implements OnInit {

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  userList: UserListModel = new UserListModel();

  constructor(private userService: UserService,private toastrService: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.getAllDisabledUser();
  }

  getAllDisabledUser(){
    let pageableRequest: PageableRequest = new PageableRequest();
    pageableRequest.page= this.pageIndex;
    pageableRequest.size= this.pageSize;
    pageableRequest.flagFilter = false;
    this.userService.getPageableUsers(pageableRequest).subscribe(
      data=> {
        this.length = data.totalElements;
        this.userList = data.userListDTO;
      }
    )
  }


  enableUser(event: UserEmitModel) {
    this.userService.enableUser(event.user).subscribe(
      (data) => {
        this.toastrService.success("User is enabled")
        this.userList.users.splice(event.i,1);
        this.length -= 1;
      }
    );
  }
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let pageableRequest: PageableRequest = new PageableRequest();
    pageableRequest.page= event.pageIndex;
    pageableRequest.size= event.pageSize;
    pageableRequest.flagFilter =  false;

    this.userService.getPageableUsers(pageableRequest).subscribe(
      data => {
        this.userList = data.userListDTO;
      }
    )
  }

}

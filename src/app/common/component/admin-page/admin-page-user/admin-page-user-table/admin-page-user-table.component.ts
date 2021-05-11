import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserListModel} from "../../../../model/user-list.model";
import {UserModel} from "../../../../model/user.model";
import {UserEmitModel} from "../../../../model/user-emit.model";

@Component({
  selector: 'app-admin-page-user-table',
  templateUrl: './admin-page-user-table.component.html',
  styleUrls: ['./admin-page-user-table.component.css']
})
export class AdminPageUserTableComponent implements OnInit {

  @Input() userData:UserListModel = new  UserListModel();
  @Input() requestUserTable: boolean = false;
  @Input() userTable: boolean = false;
  @Input() pageSize: number;
  @Input() pageIndex: number;

  @Output() enableUser : EventEmitter<UserEmitModel>;
  @Output() disableUser: EventEmitter<UserEmitModel>;

  constructor() {
    this.enableUser = new EventEmitter<UserEmitModel>();
    this.disableUser = new EventEmitter<UserEmitModel>();
  }

  ngOnInit(): void {
  }

  enableUserClicked(user: UserModel, i: number) {
    let userEmit: UserEmitModel = new UserEmitModel();
    userEmit.user = user;
    userEmit.i = i;
    this.enableUser.emit(userEmit);
  }

  disableUserClicked(user: UserModel, i: number) {
    let userEmit: UserEmitModel = new UserEmitModel();
    userEmit.user = user;
    userEmit.i = i;
    this.disableUser.emit(userEmit);
  }
}

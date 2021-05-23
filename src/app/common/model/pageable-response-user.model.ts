import {UserListModel} from "./user-list.model";

export class PageableResponseUser {
  totalElements: number;
  totalPages: number;
  userListDTO: UserListModel;

  constructor() {
    this.totalElements = null;
    this.totalPages = null;
    this.userListDTO = new UserListModel();
  }
}

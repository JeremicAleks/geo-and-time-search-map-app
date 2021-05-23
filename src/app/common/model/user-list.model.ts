import {UserModel} from "./user.model";

export class UserListModel {
  users: UserModel[];

  constructor() {
    this.users = [];
  }
}

import {UserModel} from "./user.model";

export class UserEmitModel {
  user: UserModel;
  i: number;

  constructor() {
    this.user = new UserModel();
    this.i = null;
  }
}

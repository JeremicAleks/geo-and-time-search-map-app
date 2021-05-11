export class UserModel {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  enabled: boolean;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.enabled = null;
  }
}

export class UserData {
  id: string = null;
  originalName: string = null;
  username = '';
  firstName: string = null;
  lastName: string = null;
  email: string = null;
  phoneNumber: string = null;
  roles: any[] = [];
  imageUrl: string = null;
  hasBasicAccess: boolean;

  constructor(userInfo: any) {
    Object.assign(this, userInfo);

    this.firstName = this.getFirstName();
  }

  private getFirstName() {
    if (this.originalName) {
      return this.originalName.split(' ')[0];
    }
    return this.username;
  }
}
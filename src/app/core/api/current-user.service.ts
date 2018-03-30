import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserData } from '../../shared/models/user-data.model';

@Injectable()
export class CurrentUserService {
  currentUser: UserData = this.getDummyUser();

  private getDummyUser(): UserData {
    return new UserData({
      originalName: 'Peter Pen'
    });
  }
}

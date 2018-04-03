import { Component, OnInit } from '@angular/core';

import { UserData } from '../../shared/models/user-data.model';
import { UserPicSize } from '../../shared/enums/user-pic-size.enum';
import { UserPicType } from '../../shared/enums/user-pic-type.enum';
import { CurrentUserService } from '../../core/api/current-user.service';

@Component({
  selector: 'psa-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: UserData;

  readonly userPicSizeEnum = UserPicSize;
  readonly userPicTypeEnum = UserPicType;

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit() {
    this.user = this.currentUserService.currentUser;
  }

  logOut() {
    //this.currentUserService.logOut();
  }
}

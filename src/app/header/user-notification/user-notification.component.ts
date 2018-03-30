import { Component, OnInit } from '@angular/core';

import { UserNotificationsService } from '../../core/user-notifications/user-notifications.service';
import { UserNotification } from '../../shared/models/user-notification.model';
import { UserNotificationType } from '../../shared/enums/user-notification-type.enum';

@Component({
  selector: 'mhk-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnInit {

  notifications: UserNotification[] = [];
  activeNotificationsAmount = 0;

  constructor(private userNotificationsService: UserNotificationsService) { }

  ngOnInit() {
    this.userNotificationsService.getNotifications()
      .subscribe(res => {
        this.notifications = res;
        this.activeNotificationsAmount = this.getUnreadNotificationAmount();
      });
  }

  showNotification(notification: UserNotification) {
    notification.isUnread = false;
    this.userNotificationsService.focusNotification(notification);
  }

  getIconClass(type: UserNotificationType) {
    switch (type) {
      case UserNotificationType.FILE_UPLOAD: {
        return 'fa-upload';
      }

      case UserNotificationType.ROLE_ACCESS: {
        return 'fa-warning';
      }

      case UserNotificationType.INFO:
      default: {
        return 'fa-info';
      }
    }
  }

  private getUnreadNotificationAmount() {
    return this.notifications.filter(notification => notification.isUnread).length;
  }
}

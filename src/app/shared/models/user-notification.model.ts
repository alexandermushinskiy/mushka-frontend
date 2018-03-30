import { UserNotificationType } from '../enums/user-notification-type.enum';

export class UserNotification {
  label: string;
  content: string | any;
  type: UserNotificationType;
  isUnread = true;

  constructor(label: string, content: string, type: UserNotificationType) {
    this.label = label;
    this.content = content;
    this.type = type;
  }
}

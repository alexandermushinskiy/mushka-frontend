import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationsService {
  private options = {
    enableHtml: true,
    tapToDismiss: true,
    messageClass: 'notification-body',
    toastClass: 'notification',
    positionClass: 'toast-top-right',
    timeOut: 5000
  };

  constructor( private toastrService: ToastrService) { }

  warning(title: string, message: string) {
    this.options.toastClass = 'notification warning';

    const template = this.fillDefaultTemplate(title, message);
    this.toastrService.show(template, null, this.options);
  }

  danger(title: string, message: string) {
    this.options.toastClass = 'notification danger';

    const template = this.fillDefaultTemplate(title, message);
    this.toastrService.show(template, null, this.options);
  }

  success(title: string, message: string) {
    this.options.toastClass = 'notification success';

    const template = this.fillDefaultTemplate(title, message);
    this.toastrService.show(template, null, this.options);
  }

  info(title: string, message: string) {
    this.options.toastClass = 'notification info';
    this.options.timeOut = 10000;
    const template = this.fillDefaultTemplate(title, message);
    this.toastrService.show(template, null, this.options);
  }

  private fillDefaultTemplate(title: string, message: string): string {
    return `
      <h6 class="heading">${title} <i class="notification-icon"></i></h6>
      <p>${message}</p>
   `;
  }
}

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

    const tempalate = this.fillDefaultTemplate(title, message);
    this.toastrService.show(tempalate, null, this.options);
  }

  danger(title: string, message: string) {
    this.options.toastClass = 'notification danger';

    const tempalate = this.fillDefaultTemplate(title, message);
    this.toastrService.show(tempalate, null, this.options);
  }

  success(title: string, message: string) {
    this.options.toastClass = 'notification success';

    const tempalate = this.fillDefaultTemplate(title, message);
    this.toastrService.show(tempalate, null, this.options);
  }

  info(title: string, message: string) {
    this.options.toastClass = 'notification info';
    this.options.timeOut = 10000;
    const tempalate = this.fillDefaultTemplate(title, message);
    this.toastrService.show(tempalate, null, this.options);
  }

  newForumPost() {
    this.options.toastClass = 'notification posted';

    const template = `
     <div>
      <h6 class="heading">Posted <i class="notification-icon"></i></h6>
      <p>You just posted the comment</p>
    </div>`;
    this.toastrService.show(template, null, this.options);
  }

  csrCreated(url: string) {
    this.options.toastClass = 'notification success';
    const template = `
    <div>
      <h6 class="heading">Success</h6>
      <p> CSR created successfully. </p>
      <a href="${url}">Go to CSR</a>
    </div>`;
    this.toastrService.show(template, null, this.options);
  }

  private fillDefaultTemplate(title: string, message: string): string {
    return `
      <h6 class="heading">${title} <i class="notification-icon"></i></h6>
      <p>${message}</p>
   `;
  }
}

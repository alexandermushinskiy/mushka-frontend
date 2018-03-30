import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// import { ApiCommonService } from '../../core/api/api-common.service';
import { NotificationsService } from '../../core/notifications/notifications.service';
// import { CurrentUserService } from '../../core/api/current-user.service';
// import { RatingService } from '../../core/api/rating.service';
import { UnsubscriberComponent } from '../../shared/hooks/unsubscriber.component';
import { BadgesService } from '../../core/api/badges.service';
// import { CsrRating } from '../../ticket/shared/models/csr/csr-rating.model';
// import { stateStorageServiceKeys } from '../../shared/constants/state-storage-service-keys.const';
// import { StateStorageService } from '../../core/state-storage/state-storage.service';
// import { TicketLoaderService } from '../../core/ticket-loader/ticket-loader.service';
// import { WorklistService } from '../../core/api/worklist.service';

@Component({
  selector: 'mhk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends UnsubscriberComponent implements OnInit {
  //@ViewChild('search') search: JumpToCsrComponent;

  isLoadingInProgress = false;
  totalUnseen: number;
  totalUnassigned: number;
  totalUnrated: number;
  totalNotifications: number;
  csrListUnrated: any[];
  csrListUnratedBadge: string;

  private modalRef: NgbModalRef;
  private readonly modalConfig: NgbModalOptions = {
    windowClass: 'collaboration-rating-modal'
  };

  constructor(private modalService: NgbModal,
              private router: Router,
              private notificationsService: NotificationsService,
              private badgesService: BadgesService) {
    super();
  }

  ngOnInit() {
    this.badgesService.getUnratedTicketsTotal()
      .takeUntil(this.ngUnsubscribe$)
      .subscribe(res => {
        this.totalUnrated = res;
        this.getUnratedTicketsList();
      });

    this.badgesService.getUnassignedTicketsTotal()
      .takeUntil(this.ngUnsubscribe$)
      .subscribe(res => {
        this.totalUnassigned = res;
      });

    this.badgesService.getUnseenTicketsTotal()
      .takeUntil(this.ngUnsubscribe$)
      .subscribe(res => {
        this.totalUnseen = res;
      });
  }

  jumpToCsr(csrNumber: number) {
  }

  openModal(content) {
    if (this.totalUnrated) {
      this.modalRef = this.modalService.open(content, this.modalConfig);
    }
  }

  onRate(value: number, csrNumber: string) {
    const csrRating = this.csrListUnrated.find(csr => csr.csrNumber === csrNumber).csrRating;
    csrRating.rating = value;
    this.csrListUnratedBadge = this.getCsrUnratedBadge();
  }

  closeModal() {
    // const saveRatingsMap = this.csrListUnrated.filter(csr => csr.csrRating.rating > 0);

    // if (saveRatingsMap.length) {
    //   Observable.forkJoin(
    //     saveRatingsMap
    //       .map(csr => this.ratingService.saveRating(this.currentUserService.currentUser.username, csr.csrRating))
    //   )
    //     .subscribe(
    //       () => this.onSuccessRatingUpdates(),
    //       (err) => this.onErrorRatingUpdates(err)
    //     );
    // } else {
    //   this.modalRef.close();
    // }
  }

  private getUnratedTicketsList() {
    // this.worklistService.getUnratedTickets()
    //   .takeUntil(this.ngUnsubscribe$)
    //   .subscribe(unratedTickets => {
    //     this.csrListUnrated = this.createTicketsUnrated(unratedTickets);
    //     this.csrListUnratedBadge = this.getCsrUnratedBadge();
    //   });
  }

  private getUnratedCsrs(): any[] {
    return this.csrListUnrated.filter(csr => csr.csrRating.rating === 0);
  }

  private showLoader() {
    this.isLoadingInProgress = true;
  }

  private createTicketsUnrated(tickets: any[]) {
    return tickets.map(ticket => {
      return {
        id: ticket.id,
        csrNumber: ticket.originalId,
        slogan: ticket.shortDescription,
        linkToTicket: this.getLinkToTicket(ticket.id),
        csrRating: this.createCsrRating(ticket.originalId)
      };
    });
  }

  private getLinkToTicket(id: string) {
    return `/ticket/${id}`;
  }

  private createCsrRating(csrNumber) {
    // const currentUser = this.currentUserService.currentUser;

    // return new CsrRating({
    //   csrNumber,
    //   username: currentUser.username.toLowerCase()
    // });
    return null;
  }

  private getCsrUnratedBadge() {
    const totalUnrated = this.getUnratedCsrs().length;

    if (!totalUnrated) {
      return 'All CSR’s from your worklist rated';
    }

    if (totalUnrated === 1) {
      return '1 CSR from your worklist are not rated yet';
    }

    return `${totalUnrated} CSR's from your worklist are not rated yet`;
  }

  private hideLoader() {
    this.isLoadingInProgress = false;
  }

  private onSuccessRatingUpdates() {
    /*TODO Remove this after fix with badges*/
    this.csrListUnrated = this.getUnratedCsrs();
    this.badgesService.updateUnratedTicketsTotal();
    this.notificationsService.success('Thank you!', `Your ratings saved.`);
    this.modalRef.close();
  }

  private onErrorRatingUpdates(err: string) {
    this.notificationsService.danger('Error', err);
    this.modalRef.close();
  }

  private onSuccess(id) {
    this.router.navigate([`/ticket/reload`], { skipLocationChange: true });
    // this.ticketLoaderService.show();
    // this.stateStorageService.resetState(stateStorageServiceKeys.searchPage);
    setTimeout(() => {
      this.router.navigate([`/ticket/${id}`]);
      this.hideLoader();
      //this.search.clearInput();
    }, 300);
  }

  private onTicketDoesNotExist(num) {
    this.notificationsService.warning(
      'Warning',
      `Requested CSR with number "${num}" does not exist`
    );
    this.hideLoader();
  }
}

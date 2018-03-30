import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Injectable } from '@angular/core';

@Injectable()
export class BadgesService {

  private unratedTicketsTotal$: BehaviorSubject<number> = new BehaviorSubject(0);
  private unseenTicketsTotal$: BehaviorSubject<number> = new BehaviorSubject(0);
  private unassignedTicketsTotal$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.updateUnratedTicketsTotal();
    this.updateUnseenTicketsTotal();
    this.updateUnassignedTicketsTotal();
  }

  updateUnassignedTicketsTotal() {
    // return this.readReceiptService.getUnassignedTicketsTotal()
    //   .subscribe(total => this.unratedTicketsTotal$.next(total));
  }

  updateUnratedTicketsTotal() {
    // this.worklistService.getUnratedTickets()
    //   .subscribe(unratedTickets => this.unratedTicketsTotal$.next(unratedTickets.length));
  }

  getUnratedTicketsTotal(): Observable<number> {
    return this.unratedTicketsTotal$.asObservable();
  }

  getUnassignedTicketsTotal(): Observable<number> {
    return this.unassignedTicketsTotal$.asObservable();
  }

  getUnseenTicketsTotal(): Observable<number> {
    return this.unseenTicketsTotal$.asObservable();
  }

  private updateUnseenTicketsTotal() {
    // this.worklistService.getUnseenTickets()
    //   .subscribe((tickets) => this.unseenTicketsTotal$.next(tickets.length));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarMenuStateService {
  private isMenuCollapsed$ = new BehaviorSubject<boolean>(false);
  private viewCollapseState$ = new Subject<void>();

  setCollapsedState(value: boolean) {
    this.isMenuCollapsed$.next(value);
  }

  isCollapsed(): Observable<boolean> {
    return this.isMenuCollapsed$.asObservable();
  }

  changeMenuItemCollapsedState() {
    this.viewCollapseState$.next();
  }

  isViewCollapsedStateChanged(): Observable<void> {
    return this.viewCollapseState$.asObservable();
  }
}

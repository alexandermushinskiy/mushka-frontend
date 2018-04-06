import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SidebarMenuStateService {
  private isMenuCollapsed$ = new BehaviorSubject<boolean>(false);

  setCollapsedState(value: boolean) {
    this.isMenuCollapsed$.next(value);
  }

  isCollapsed(): Observable<boolean> {
    return this.isMenuCollapsed$.asObservable();
  }
}

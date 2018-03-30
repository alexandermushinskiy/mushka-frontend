import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core';

/*
  Use this component to inherit from
 */
export abstract class UnsubscriberComponent implements OnDestroy {
  protected ngUnsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}

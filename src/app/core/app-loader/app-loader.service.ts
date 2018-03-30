import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppLoaderService {
  private isAppReady$ = new BehaviorSubject(false);

  get appReady() {
    return this.isAppReady$.asObservable();
  }

  bootstrap() {
    this.isAppReady$.next(true);
  }
}

import { Component, OnInit } from '@angular/core';

import { AppLoaderService } from '../../../core/app-loader/app-loader.service';

@Component({
  selector: 'psa-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {
  isLoaded = false;
  shouldShowAnimation = false;

  private readonly loadingTime = 1500;

  constructor(private appLoaderService: AppLoaderService) {
    this.appLoaderService.appReady.subscribe((res) => {
      if (res) {
        this.hide();
      }
    });
  }

  ngOnInit() {
  }

  private hide () {
    this.shouldShowAnimation = true;

    setTimeout(() => {
      this.isLoaded = true;
    }, this.loadingTime);
  }
}

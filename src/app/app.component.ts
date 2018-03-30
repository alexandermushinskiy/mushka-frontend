import { Component, OnInit } from '@angular/core';

import { AppLoaderService } from './core/app-loader/app-loader.service';

@Component({
  selector: 'mhk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isAppReady = false;

  private isStarted = false;

  constructor(private appLoaderService: AppLoaderService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.appLoaderService.bootstrap();
      this.isAppReady = true;
    }, 550);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { BrowserDetectorService } from '../../../core/browser-detector/browser-detector.service';

@Component({
  selector: 'mhk-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() isLoading = false;
  isIE = false;

  constructor(private bowserDetectorService: BrowserDetectorService) {
  }

  ngOnInit() {
    this.isIE = this.bowserDetectorService.isIE();
  }
}

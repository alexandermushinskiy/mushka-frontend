import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'psa-sizes-labels',
  templateUrl: './sizes-labels.component.html',
  styleUrls: ['./sizes-labels.component.scss']
})
export class SizesLabelsComponent implements OnInit {
  @Input() sizes: string[];
  
  constructor() { }

  ngOnInit() {
    //this.sizes = ['35-39', '41-45'];
  }

}

import { Component, OnInit, Input } from '@angular/core';

import { SizeItem } from '../../models/size-item.model';

@Component({
  selector: 'psa-sizes-labels',
  templateUrl: './sizes-labels.component.html',
  styleUrls: ['./sizes-labels.component.scss']
})
export class SizesLabelsComponent implements OnInit {
  @Input() sizes: SizeItem[];
  
  constructor() { }

  ngOnInit() {
  }

}

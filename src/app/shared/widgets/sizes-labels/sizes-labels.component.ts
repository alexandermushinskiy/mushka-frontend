import { Component, OnInit, Input } from '@angular/core';

import { SizeItem } from '../../models/size-item.model';

@Component({
  selector: 'psa-sizes-labels',
  templateUrl: './sizes-labels.component.html',
  styleUrls: ['./sizes-labels.component.scss']
})
export class SizesLabelsComponent implements OnInit {
  @Input() set sizes(source: SizeItem[]) {
    this.sizeItems = !source ? [] : source;
  }

  sizeItems: SizeItem[]

  constructor() { }

  ngOnInit() {
  }

}

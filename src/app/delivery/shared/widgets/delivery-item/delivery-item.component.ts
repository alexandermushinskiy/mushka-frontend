import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Delivery } from '../../models/delivery.model';

@Component({
  selector: 'psa-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss']
})
export class DeliveryItemComponent implements OnInit {
  @Input() delivery: Delivery;
  @Input() canEdit = false;
  @Input() canDelete = false;
  @Output() onEdit = new EventEmitter<Delivery>();
  @Output() onDelete = new EventEmitter<Delivery>();

  expandedItemsStates: { [id: string]: boolean } = {};
  isExpanded = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapseItemMode() {
    this.isExpanded = !this.isExpanded;
  }

  edit() {
    this.onEdit.emit(this.delivery);
  }
  delete() {
    this.onDelete.emit(this.delivery);
  }
}

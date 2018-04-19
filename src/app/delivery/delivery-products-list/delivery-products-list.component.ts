import { Component, OnInit, ElementRef, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ProductItemTablePreview } from '../shared/models/product-item-table-preview.model';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { ProductItem } from '../shared/models/product-item.model';

@Component({
  selector: 'psa-delivery-products-list',
  templateUrl: './delivery-products-list.component.html',
  styleUrls: ['./delivery-products-list.component.scss']
})
export class DeliveryProductsListComponent implements OnInit {
  @ViewChild('removeConfirmation') removeConfirmation: ElementRef;
  @Input() set productItems(data: ProductItem[]) {
    if (data) {
      this.deliveryItemRows = data.map((el, index) => new ProductItemTablePreview(el, index));
      this.total = data.length;
    }
  }
  @Output() onItemAdded = new EventEmitter<ProductItem>();
  @Output() onItemUpdated = new EventEmitter<ProductItem>();
  @Output() onItemDeleted = new EventEmitter<number>();
  
  availableColumns = availableColumns.deliveryProducts;
  deliveryItemRows: ProductItemTablePreview[] = [];
  total = 0;
  shown = 0;
  isModalLoading: false;
  editing = {};
  indexToDelete: number;

  private modalRef: NgbModalRef;
  private readonly modalConfig: NgbModalOptions = {
    windowClass: 'delivery-items-modal',
    backdrop: 'static',
    size: 'sm'
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  onRowsUpdated(rowsAmount: number) {
    this.shown = rowsAmount;
  }

  addDeliveryItem(content: ElementRef) {
    this.modalRef = this.modalService.open(content, this.modalConfig);
  }
  
  closeModal() {
    this.modalRef.close();
  }

  getRowClass(row) {
    return row.className;
  }

  saveDeliveryItem(deliveryItem: ProductItem) {
    this.onItemAdded.emit(deliveryItem);
    this.closeModal();
  }

  activateRow({ type, row, cellElement }: { type: string, row: ProductItemTablePreview, cellElement: any }) {
    // if (type === 'click') {
    //   this.editedTimeReport = row;
    //   cellElement.blur();
    //   this.openTimeReportModal();
    //   row.className += ' active';
    // }
  }

  deleteItem(rowIndex) {
    this.indexToDelete = rowIndex;
    this.modalRef = this.modalService.open(this.removeConfirmation);
  }

  confirmDelete() {
    this.onItemDeleted.emit(this.indexToDelete);
  }

  startEditing(cellKey: string) {
    this.editing = {};
    this.editing[cellKey] = true;
  }

  updateValue(value, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.deliveryItemRows[rowIndex][cell] = value;
    this.deliveryItemRows = [...this.deliveryItemRows];
    //console.log('UPDATED!', this.deliveryItemRows[rowIndex][cell]);
  }
}

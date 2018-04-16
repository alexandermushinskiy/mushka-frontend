import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
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
  @Input() set productItems(data: ProductItem[]) {
    if (data) {
      this.deliveryItemRows = data.map((el, index) => new ProductItemTablePreview(el, index));
      this.total = data.length;
    }
  }
  @Output() onProductItemAdded = new EventEmitter<ProductItem>();
  
  availableColumns = availableColumns.deliveryProducts;
  deliveryItemRows: ProductItemTablePreview[] = [];
  total = 0;
  shown = 0;
  isModalLoading: false;

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

  saveDeliveryItem(deliveryItem: ProductItem) {
    this.onProductItemAdded.emit(deliveryItem);
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
}

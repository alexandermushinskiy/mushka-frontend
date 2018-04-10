import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { availableColumns } from '../../shared/constants/available-columns.const';
import { ServiceItem } from '../shared/models/service-item.model';
import { ServiceTablePreview } from '../shared/models/service-table-preview.model';

@Component({
  selector: 'psa-delivery-services-list',
  templateUrl: './delivery-services-list.component.html',
  styleUrls: ['./delivery-services-list.component.scss']
})
export class DeliveryServicesListComponent implements OnInit {
  availableColumns = availableColumns.deliveryServices;
  total = 0;
  shown = 0;
  serviceItemRows: ServiceTablePreview[] = [];

  private modalRef: NgbModalRef;
  private readonly modalConfig: NgbModalOptions = {
    windowClass: 'delivery-items-modal',
    backdrop: 'static',
    size: 'sm'
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    const deliveryProducts = [
      new ServiceItem({ name: 'Фотосессия товара', cost: 270.00 }),
      new ServiceItem({ name: 'Разработка вебсайта', cost: 7000.00 })
    ]

    setTimeout(() => {
      this.serviceItemRows = deliveryProducts.map((el, index) => new ServiceTablePreview(el, index));
      this.total = deliveryProducts.length;
    }, 0);
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

  saveDeliveryItem(deliveryItem: ServiceItem) {
    console.info(deliveryItem);
  }

}

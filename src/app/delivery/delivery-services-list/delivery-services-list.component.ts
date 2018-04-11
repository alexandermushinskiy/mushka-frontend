import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { availableColumns } from '../../shared/constants/available-columns.const';
import { ServiceItem } from '../shared/models/service-item.model';
import { ServiceItemTablePreview } from '../shared/models/service-item-table-preview.model';

@Component({
  selector: 'psa-delivery-services-list',
  templateUrl: './delivery-services-list.component.html',
  styleUrls: ['./delivery-services-list.component.scss']
})
export class DeliveryServicesListComponent implements OnInit {
  @Input() set serviceItems(data: ServiceItem[]) {
    if (data) {
      this.serviceItemRows = data.map((el, index) => new ServiceItemTablePreview(el, index));
      this.total = data.length;
    }
  }
  @Output() onServiceItemAdded = new EventEmitter<ServiceItem>();
  
  availableColumns = availableColumns.deliveryServices;
  total = 0;
  shown = 0;
  serviceItemRows: ServiceItemTablePreview[] = [];

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

  saveServiceItem(serviceItem: ServiceItem) {
    this.onServiceItemAdded.emit(serviceItem);
    this.closeModal();
  }

}

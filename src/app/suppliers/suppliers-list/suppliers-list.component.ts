import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SupplierTablePreview } from '../shared/models/supplier-table-preview';
import { SuppliersTableComponent } from '../suppliers-table/suppliers-table.component';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { SuppliersService } from '../../core/api/suppliers.service';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { Supplier } from '../../shared/models/supplier.model';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'psa-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent implements OnInit {
  @ViewChild(SuppliersTableComponent) datatable: SuppliersTableComponent;
  
  rows: SupplierTablePreview[];
  loadingIndicator = true;
  isModalLoading = false;
  total = 0;
  shown = 0;
  availableCols = availableColumns.suppliers;
  selectedSupplier: Supplier = null;

  private modalRef: NgbModalRef;
  private readonly modalConfig: NgbModalOptions = {
    windowClass: 'supplier-modal',
    backdrop: 'static'
  };
  
  constructor(private modalService: NgbModal,
              private suppliersService: SuppliersService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.loadingIndicator = true;

    this.suppliersService.getSuppliers()
      .subscribe(
        res => this.onSuccess(res),
        () => this.onError()
      );
  }

  onRowsUpdated(rowsAmount: number) {
    this.shown = rowsAmount;
  }

  addSupplier(content: ElementRef) {
    this.modalRef = this.modalService.open(content, this.modalConfig);
  }

  saveSupplier(supplier: Supplier) {
    console.info(supplier);
    this.suppliersService.addSupplier(supplier)
      .subscribe(
        (res: Supplier) => this.onSaveSuccess(res, supplier.id ? 'изменен' : 'добавлен'),
        () => this.onSaveError()
      );
  }

  closeModal() {
    this.modalRef.close();
  }

  private onSuccess(suppliers) {
    this.rows = suppliers.map((el, index) => new SupplierTablePreview(el, index));
    this.total = suppliers.length;
    this.loadingIndicator = false;
  }

  private onError() {
    this.loadingIndicator = false;
    this.notificationsService.danger('Ошибка', 'Невозможно загрузить поставщиков');
  }
  
  private onSaveSuccess(supplier: Supplier, action: string) {
    this.isModalLoading = false;
    this.closeModal();
    this.notificationsService.success('Успех', `Поставщик \"${supplier.name}\" успешно ${action}`);
  }

  private onSaveError() {
    this.notificationsService.danger('Ошибка', 'Невозможно соранить данные поставщика');
    this.isModalLoading = false;
  }

}

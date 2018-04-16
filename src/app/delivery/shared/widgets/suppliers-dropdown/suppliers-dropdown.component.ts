import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';

import { Supplier } from '../../../../shared/models/supplier.model';
import { SuppliersService } from '../../../../core/api/suppliers.service';

@Component({
  selector: 'psa-suppliers-dropdown',
  templateUrl: './suppliers-dropdown.component.html',
  styleUrls: ['./suppliers-dropdown.component.scss']
})
export class SuppliersDropdownComponent implements OnInit {
  @Input() initialValue: Supplier;
  @Input() required = true;
  @Output() onSupplierSelected = new EventEmitter<Supplier>();

  selectedSupplier: Supplier;
  suppliers: Supplier[];

  constructor(private suppliersService: SuppliersService) { }

  ngOnInit() {
    this.suppliersService.getSuppliers()
      .subscribe((suppliers: Supplier[]) => this.suppliers = suppliers);
  }

  // reset() {
  //   this.selectedSupplier = null;
  // }

  onOptionSelected(supplier: Supplier) {
    this.selectedSupplier = supplier;
    this.onSupplierSelected.emit(supplier);
  }  
}

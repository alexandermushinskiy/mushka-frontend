import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';

import { Supplier } from '../../../../shared/models/supplier.model';
import { SuppliersService } from '../../../../core/api/suppliers.service';


@Component({
  selector: 'psa-suppliers-dropdown',
  templateUrl: './suppliers-dropdown.component.html',
  styleUrls: ['./suppliers-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuppliersDropdownComponent),
    multi: true
  }]
})
export class SuppliersDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() isRequired = true;
  @Input() isDisabled = false;
  @Output() onSupplierSelected = new EventEmitter<Supplier>();

  selectedSupplier: Supplier;
  suppliers: Supplier[];

  constructor(private suppliersService: SuppliersService) { }

  ngOnInit() {
    this.suppliersService.getSuppliers()
      .subscribe((suppliers: Supplier[]) => this.suppliers = suppliers);
  }

  writeValue(value: Supplier): void {
    this.selectedSupplier = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched() {
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  onOptionSelected(supplier: Supplier) {
    this.selectedSupplier = supplier;
    
    this.onChangeCallback(supplier);
    this.onSupplierSelected.emit(supplier);
  }

  private onChangeCallback: any = () => {};
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Supplier } from '../../../../shared/models/supplier.model';
import { SuppliersService } from '../../../../core/api/suppliers.service';

@Component({
  selector: 'psa-supplier-modal',
  templateUrl: './supplier-modal.component.html',
  styleUrls: ['./supplier-modal.component.scss']
})
export class SupplierModalComponent implements OnInit {
  @Input() supplier: Supplier = null;
  @Input() isSaving = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Supplier>();
  
  supplierForm: FormGroup;
  isEdit = false;
  name: string;

  constructor(private formBuilder: FormBuilder,
              private suppliersService: SuppliersService) { }

  ngOnInit() {
    this.isEdit = !!this.supplier;

    if (this.isEdit) {
      this.name = this.supplier.name;
    }

    this.buildForm();
  }

  save() {
    const supplierFormValue = this.supplierForm.value;

    if (this.isEdit) {
      this.supplier.name = supplierFormValue.name;
    } else {
      this.supplier = new Supplier({
        name: supplierFormValue.name
      });
    }

    this.onSave.emit(this.supplier);
  }

  close() {
    this.onClose.emit();
  }

  private buildForm() {
    this.supplierForm = this.formBuilder.group({
      name: [this.name, Validators.required]
    });
  }

}

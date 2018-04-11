import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServiceItem } from '../../models/service-item.model';

@Component({
  selector: 'psa-delivery-service-modal',
  templateUrl: './delivery-service-modal.component.html',
  styleUrls: ['./delivery-service-modal.component.scss']
})
export class DeliveryServiceModalComponent implements OnInit {
  @Input() isSaving = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<ServiceItem>();
  
  serviceItemForm: FormGroup;
  name: string;
  cost: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  save() {
    const serviceItemFormValue = this.serviceItemForm.value;

    const deliveryItem = new ServiceItem({
      name: serviceItemFormValue.name,
      cost: serviceItemFormValue.cost
    });

    this.onSave.emit(deliveryItem);
  }

  close() {
    this.onClose.emit();
  }

  private buildForm() {
    this.serviceItemForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      cost: [this.cost]
    });
  }
}

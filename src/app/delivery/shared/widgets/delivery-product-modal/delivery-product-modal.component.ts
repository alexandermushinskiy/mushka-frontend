import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { DeliveryProductItem } from '../../models/delivery-product-item';
import { ProductsServce } from '../../../../core/api/products.service';

@Component({
  selector: 'psa-delivery-product-modal',
  templateUrl: './delivery-product-modal.component.html',
  styleUrls: ['./delivery-product-modal.component.scss']
})
export class DeliveryProductModalComponent implements OnInit {
  @Input() isSaving = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<DeliveryProductItem>();
  
  deliveryItemForm: FormGroup;
  name: string;
  amount: number;
  costPerItem: number;

  displayValue: string;
  items: Observable<DeliveryProductItem>;
  foundItems: Observable<DeliveryProductItem>;
  isLoadingItems: false;
  private requestedItem$ = new Subject<string>();
  
  constructor(private formBuilder: FormBuilder,
              private productsServce: ProductsServce) { }

  ngOnInit() {
    this.items = Observable.create((observer: any) => {
      this.productsServce.getProducts(this.displayValue).subscribe((result: any) => {
        this.foundItems = result;
        observer.next(result);
      });
    });

    this.requestedItem$
      .debounceTime(300)
      .subscribe((signum: string) => {});

    this.buildForm();
  }

  save() {

    const deliveryItemFormValue = this.deliveryItemForm.value;

    const deliveryItem = new DeliveryProductItem({
      name: deliveryItemFormValue.name,
      amount: deliveryItemFormValue.amount,
      costPerItem: deliveryItemFormValue.costPerItem
    });

    this.onSave.emit(deliveryItem);
  }

  close() {
    this.onClose.emit();
  }
  
  onLoading(isLoading: boolean) {
    //this.isLoadingItems = isLoading;
  }
  
  onSelectItem(match: TypeaheadMatch) {
    // const fullName = `${match.item.firstName} ${match.item.lastName}`;
    // const signum = match.item.userId;
// debugger;
//     this.displayValue = match.item.name;
    //this.requestedParticipantSignum$.next(signum);
  }

  private buildForm() {
    this.deliveryItemForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      amount: [this.amount, Validators.required],
      costPerItem: [this.costPerItem, Validators.required]
    });
  }
}

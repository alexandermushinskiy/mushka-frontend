import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProductItem } from '../../models/product-item.model';
import { ProductsServce } from '../../../../core/api/products.service';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'psa-delivery-product-modal',
  templateUrl: './delivery-product-modal.component.html',
  styleUrls: ['./delivery-product-modal.component.scss']
})
export class DeliveryProductModalComponent implements OnInit {
  @Input() isSaving = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<ProductItem>();
  
  deliveryItemForm: FormGroup;
  name: string;
  amount: number;
  costPerItem: number;
  notes: string;

  displayValue: string;
  selectedProduct: Product;
  items: Observable<Product[]>;
  foundItems: Product[];
  isLoadingItems: false;
  isCreateProduct = false;
  private requestedItem$ = new Subject<string>();
  
  constructor(private formBuilder: FormBuilder,
              private productsServce: ProductsServce) { }

  ngOnInit() {
    this.items = Observable.create((observer: any) => {
      this.productsServce.getProducts(this.displayValue)
        .subscribe((result: Product[]) => {
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

    const deliveryItem = new ProductItem({
      product: this.selectedProduct,
      amount: deliveryItemFormValue.amount,
      costPerItem: deliveryItemFormValue.costPerItem,
      notes: deliveryItemFormValue.notes
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
    this.selectedProduct = match.item;
  }

  onKeyup() {
    if (this.selectedProduct) {
      this.selectedProduct = null;
    }
  }

  private buildForm() {
    this.deliveryItemForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      amount: [this.amount, Validators.required],
      costPerItem: [this.costPerItem, Validators.required],
      notes: this.notes
    });
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UnsubscriberComponent } from '../../../../shared/hooks/unsubscriber.component';
import { Product } from '../../../../shared/models/product.model';
import { Category } from '../../../../shared/models/category.model';
import { ProductsServce } from '../../../../core/api/products.service';
import { CategoriesService } from '../../../../core/api/categories.service';
import { SizeItem } from '../../../../shared/models/size-item.model';
import { SizesHelperServices } from '../../services/sizes-helper.service';

@Component({
  selector: 'psa-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent extends UnsubscriberComponent implements OnInit {
  @Input() product: Product = null;
  @Input() categoryId: string;
  @Input() isSaving = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Product>();

  productForm: FormGroup;
  isEdit = false;
  name: string;
  code: string;
  category: Category;
  sizes: string;
  isSizesRequired: boolean;
  availableSizes: string[] = [];
  categories: Category[] = [];
  selectedSizes: string[] = [];

  private get categoryFormGroup(): FormGroup {
    return <FormGroup>this.productForm.get('category');
  }

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private productsService: ProductsServce,
              private sizesHelperServices: SizesHelperServices) {
    super();
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        if (this.categoryId) {
          const category = categories.find(cat => cat.id === this.categoryId);
          this.categoryFormGroup.setValue(category);

          this.onCategoryChanged(category);
        }
      });

    this.isEdit = !!this.product;

    // if (this.isEdit) {
    //   this.name = this.product.name;
    //   this.code = this.product.code;
    //   this.category = this.product.category;
    //   this.sizes = this.product.sizes.map(s => s.size).join(this.sizesDelimiter);
    // }

    this.buildForm();
  }

  save() {
    const productFormValue = this.productForm.value;
    const sizes = this.sizesHelperServices.convertToArray(productFormValue.sizes).map(size => new SizeItem(size));

    if (this.isEdit) {
      this.product.name = productFormValue.name;
      this.product.code = productFormValue.code;
      this.product.category = this.categoryFormGroup.value;
      this.product.sizes = sizes;
    } else {
      this.product = new Product({
        name: productFormValue.name,
        code: productFormValue.code.toUpperCase(),
        category: this.categoryFormGroup.value,
        sizes: sizes
      });
    }

    this.onSave.emit(this.product);
  }

  close() {
    this.onClose.emit();
  }

  onOptionChanged(sizes: string) {
    this.sizes = sizes;
    this.selectedSizes = this.sizesHelperServices.convertToArray(sizes);
  }

  onCategoryChanged(category) {
    this.isSizesRequired = category.isSizesRequired;
    this.availableSizes = category.sizes || [];

    this.updateSizesValidity(category.isSizesRequired);
  }

  private buildForm() {
    this.productForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      category: [this.category, Validators.required],
      code: [this.code, Validators.required],
      sizes: [this.sizes]
    });
  }

  private updateSizesValidity(isRequired: boolean) {
    const valueCtrl = this.productForm.controls['sizes'];

    if (isRequired) {
      valueCtrl.setValidators(Validators.required);
    } else {
      valueCtrl.clearValidators();
    }

    valueCtrl.updateValueAndValidity();
  }
}

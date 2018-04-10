import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UnsubscriberComponent } from '../../../../shared/hooks/unsubscriber.component';
import { Product } from '../../../../shared/models/product.model';
import { ProductsServce } from '../../../../core/api/products.service';
import { CategoriesService } from '../../../../core/api/categories.service';
import { SizeItem } from '../../../../shared/models/size-item.model';
import { Category } from '../../../../shared/models/category.model';

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
  availableSizes: string[] = [];
  categories: Category[] = [];
  selectedSizes: string[] = [];
  private readonly sizesDelimiter = ';';

  get categoryFormGroup(): FormGroup {
    return <FormGroup>this.productForm.get('category');
  }

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private productsService: ProductsServce) {
    super();
  }

  ngOnInit() {
    this.isEdit = !!this.product;
    
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        if (this.categoryId) {
          const category = categories.find(cat => cat.id === this.categoryId);
          this.availableSizes = category.sizes;
          this.categoryFormGroup.setValue(category);
        }
      });

    if (this.isEdit) {
      this.name = this.product.name;
      this.code = this.product.code;
      this.category = this.product.category;
      this.sizes = this.product.sizes.map(s => s.size).join(this.sizesDelimiter);
    }

    this.buildForm();
  }

  save() {
    const productFormValue = this.productForm.value;

    if (this.isEdit) {
      this.product.name = productFormValue.name;
      this.product.code = productFormValue.code;
      this.product.category = this.categoryFormGroup.value;
      //this.product.sizes
    } else {
      this.product = new Product({
        name: productFormValue.name,
        code: productFormValue.code.toUpperCase(),
        category: this.categoryFormGroup.value,
        sizes: this.convertStringToArray(productFormValue.sizes).map(size => new SizeItem(size))
      });
    }

    this.onSave.emit(this.product);
  }

  close() {
    this.onClose.emit();
  }

  onOptionChanged(sizes: string) {
    this.sizes = sizes;
    this.selectedSizes = this.convertStringToArray(sizes);
  }

  onCategoryChanged(category) {
    this.availableSizes = category.sizes;
  }

  private buildForm() {
    this.productForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      category: [{value: this.category, /*disabled: true*/}, Validators.required],
      code: [this.code, Validators.required],
      sizes: [this.name, Validators.required]
    });
  }

  private convertStringToArray(value: string): string[] {
    return !value
      ? []
      : value.split(this.sizesDelimiter).map(param => param.trim());
  }
}

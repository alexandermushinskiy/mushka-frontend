import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Category } from '../../../../shared/models/category.model';
import { SizesHelperServices } from '../../services/sizes-helper.service';

@Component({
  selector: 'psa-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {
  @Input() category: Category = null;
  @Input() categoryId: string;
  @Input() isSaving = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Category>();

  categoryForm: FormGroup;
  name: string;
  isSizesRequired = false;
  sizes: string;
  isEdit: boolean;
  
  constructor(private formBuilder: FormBuilder,
              private sizesHelperServices: SizesHelperServices) { }

  ngOnInit() {
    this.isEdit = !!this.category;

    if (this.isEdit) {
      this.name = this.category.name;
      this.isSizesRequired = this.category.isSizesRequired;
      this.sizes = this.sizesHelperServices.convertToString(this.category.sizes);
    }

    this.buildForm();
  }

  close() {
    this.onClose.emit();
  }

  save() {
    const categoryFormValue = this.categoryForm.value;
    const sizes = this.sizesHelperServices.convertToArray(categoryFormValue.sizes);

    if (this.isEdit) {
      this.category.name = categoryFormValue.name;
      this.category.isSizesRequired = categoryFormValue.isSizesRequired;
      this.category.sizes = sizes;
    } else {
      this.category = new Category({
        name: categoryFormValue.name,
        isSizesRequired: categoryFormValue.isSizesRequired,
        sizes: sizes
      });
    }

    this.onSave.emit(this.category);
  }

  private buildForm() {
    this.categoryForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      isSizesRequired: [this.isSizesRequired],
      sizes: [this.sizes]
    });

    this.addFieldChangeListeners();
  }

  private addFieldChangeListeners() {
    const isSizesRequiredCtrl = this.categoryForm.controls['isSizesRequired'];
    const sizesCtrl = this.categoryForm.controls['sizes'];

    isSizesRequiredCtrl.valueChanges.subscribe((value: boolean) => {
      if (value) {
        sizesCtrl.setValidators(Validators.required);
      } else {
        sizesCtrl.clearValidators();
      }
      sizesCtrl.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
  }
  
}

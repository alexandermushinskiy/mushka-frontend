import { AbstractControl, ValidatorFn, Validators, FormArray, Validator } from '@angular/forms';

export class DeliveryItemsValidator {
  static required(formControl: any): { [key: string]: any } {
    if ((<FormArray>formControl.get('products')).length === 0 && (<FormArray>formControl.get('services')).length === 0) {
      return { 'invalidDeliveryItems': false };
    }
    return null;
  }
}

import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'psa-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyInputComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CurrencyInputComponent),
    multi: true,
  } ]
})
export class CurrencyInputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() disabled = false;
  @Input() placeholder = 'Введите сумму';

  currencyValue: number | null = null;

  constructor() { }

  ngOnInit() {
  }

  onChanged() {
    console.info(this.currencyValue);
    this.onChangeCallback(this.currencyValue);
  }

  writeValue(value: any): void {
    if (!value) {
      return;
    }
    this.currencyValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched() {
  }
  
  validate(control: FormControl): { [key: string]: any; } {
    return (!this.currencyValue) ? null : {
      jsonParseError: {
          valid: false,
      },
  };
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error("Method not implemented.");
  // }

  private onChangeCallback: any = () => {};
}

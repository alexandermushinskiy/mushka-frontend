import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'psa-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyInputComponent),
    multi: true
  }]
})
export class CurrencyInputComponent implements OnInit, ControlValueAccessor {
  @Input() disabled = false;
  @Input() placeholder = 'Введите сумму';

  currencyValue: number | null = null;

  constructor() { }

  ngOnInit() {
  }

  onChanged() {
    this.onChangeCallback(this.currencyValue);
  }

  writeValue(value: any): void {
    if (value) {
      this.currencyValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched() {
  }

  private onChangeCallback: any = () => {};
}

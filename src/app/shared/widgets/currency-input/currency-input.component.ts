import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() value: number | null = null;
  @Input() disabled = false;
  @Input() placeholder = 'Введите сумму';
  @Output() onBlur = new EventEmitter<number>();
  @Output() onClickOutside = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onChanged() {
    this.onChangeCallback(this.value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched() {
  }

  blur() {
    this.onBlur.emit(this.value);
  }

  clickOutside() {
    this.onClickOutside.emit(this.value);
  }

  private onChangeCallback: any = () => {};
}

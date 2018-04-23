import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'psa-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: string[];
  @Input() initialValue: string;
  @Input() required: boolean;
  @Output() onSelectedValue = new EventEmitter<string>();

  value: string;
  
  constructor() { }

  ngOnInit() {
    if (this.initialValue) {
      this.value = this.initialValue;
    }
  }
  
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched() {
  }

  onOptionSelect(option: string) {
    this.value = option;

    this.onChangeCallback(option);
    this.onSelectedValue.emit(option);
  }

  private onChangeCallback: any = () => {};
}

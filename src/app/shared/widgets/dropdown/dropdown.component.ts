import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'psa-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
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

  reset() {
    this.value = null;
  }

  onOptionSelect(option: string) {
    this.value = option;
    this.onSelectedValue.emit(option);
  }
}

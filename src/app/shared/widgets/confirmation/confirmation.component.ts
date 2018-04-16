import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'psa-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  @Input() text: string;
  @Input() isSaving = false;
  @Input() confirmButtonText = 'OK';
  @Input() headerText = 'Подтверждение';
  @Input() cancelText = 'Отмена';
  @Output() onConfirm = new EventEmitter();
  @Output() onClose = new EventEmitter();

  closeModal() {
    this.onClose.emit();
  }
}

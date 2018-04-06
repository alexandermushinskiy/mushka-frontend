import { Directive, Input, HostListener } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[psaClosePopoverOnClickOutside=popover][ngbPopover]'
})
export class ClosePopoverOnClickOutsideDirective {
  @Input() set psaClosePopoverOnClickOutside(popover: NgbPopover) {
    this.popover = popover;
  }

  active = false;
  private popover: NgbPopover;

  constructor() {
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement): void {
    if (!this.popover.isOpen()) {
      this.active = false;
      return;
    }

    if (!this.active) {
      this.active = true;
      return;
    }

    const cancelClose = Array.from(document.getElementsByTagName('ngb-popover-window'))
      .find(popoverWindow => popoverWindow.contains(targetElement));

    if (!cancelClose) {
      this.popover.close();
    }

    this.active = this.popover.isOpen();
  }
}

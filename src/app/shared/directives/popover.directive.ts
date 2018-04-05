import { Directive, HostListener, ComponentRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';

import { PopoverComponent } from '../widgets/popover/popover.component';

@Directive({
  selector: '[psaPopover]',
  exportAs: 'psaPopover'
})
export class PopoverDirective {
  @Input()
  popoverContent: PopoverComponent;

  @Input()
  appendToSelector: string = null;

  @Input()
  shiftX = 0;

  @Input()
  popoverPlacement: 'right' | 'left';

  @Input() showEventType: 'click' | 'hover' = 'hover';

  @Input()
  shiftY = 0;

  @Output()
  onPopoverShown = new EventEmitter<PopoverDirective>();

  @Output()
  onPopoverHidden = new EventEmitter<PopoverDirective>();

  private popoverComponent: ComponentRef<PopoverComponent>;
  private popoverVisible: boolean;

  constructor(protected viewContainerRef: ViewContainerRef) {
  }

  @HostListener('focusin')
  @HostListener('mouseenter')
  showOnHover(): void {
    this.showPopover('hover');
  }

  @HostListener('click')
  showOnClick(): void {
    this.showPopover('click');
  }

  showPopoverElement() {
    if (this.popoverVisible) {
      return;
    }

    const popover = <PopoverComponent>this.popoverContent;
    popover.popoverDirective = this;
    popover.appendToSelector = this.appendToSelector;
    popover.shift = { x: this.shiftX, y: this.shiftY };
    popover.placement = this.popoverPlacement;
    popover.onCloseFromOutside
      .first()
      .subscribe(() => this.hidePopoverElement());

    this.onPopoverShown.emit(this);
    popover.showPopover();
    this.popoverVisible = true;

  }

  hidePopoverElement() {
    if (!this.popoverVisible) {
      return;
    }

    this.popoverVisible = false;
    if (this.popoverComponent) {
      this.popoverComponent.destroy();
    }

    (<PopoverComponent>this.popoverContent).hideContentFromPopover();
    this.onPopoverHidden.emit(this);
  }

  getNativeElement() {
    return this.viewContainerRef.element.nativeElement;
  }

  private showPopover(eventName: string) {
    if (this.showEventType === eventName) {
      this.showPopoverElement();
    }
  }
}

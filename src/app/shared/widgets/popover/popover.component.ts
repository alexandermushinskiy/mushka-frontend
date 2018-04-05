import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef,
  EventEmitter, Renderer2, ViewChild, Output, Input
} from '@angular/core';

import { PopoverDirective } from '../../directives/popover.directive';

@Component({
  selector: 'psa-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements AfterViewInit {
  @Input() hasPadding = true;
  @Input() placement: string;
  @Output() onShown = new EventEmitter<boolean>();
  @ViewChild('psaPopover') popoverElement: ElementRef;

  readonly hiddenTopPosition = -4000;
  readonly hiddenLeftPosition = -4000;
  popoverDirective: PopoverDirective;
  onCloseFromOutside = new EventEmitter();
  topShift = this.hiddenTopPosition;
  leftShift = this.hiddenLeftPosition;
  isPresent = false;
  listenMouseEventFunction: any;
  appendToSelector: string;
  shift: { x: number, y: number };

  static getNativeElementOffsetAndSize(nativeEl: any): { width: number, height: number, top: number, left: number } {
    const boundingClientRectangle = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRectangle.width || nativeEl.offsetWidth,
      height: boundingClientRectangle.height || nativeEl.offsetHeight,
      top: boundingClientRectangle.top + (window.pageYOffset || window.document.documentElement.scrollTop),
      left: boundingClientRectangle.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
    };
  }

  static getElementStyleByProperty(nativeEl: HTMLElement, cssProp: string): string {
    if ((<any>nativeEl).currentStyle) {
      return (<any>nativeEl).currentStyle[cssProp];
    }
    if (window.getComputedStyle) {
      return (<any>window.getComputedStyle)(nativeEl)[cssProp];
    }
    return (<any>nativeEl.style)[cssProp];
  }

  static checkElementStaticPosition(nativeEl: HTMLElement): boolean {
    return (PopoverComponent.getElementStyleByProperty(nativeEl, 'position') || 'static') === 'static';
  }

  constructor(private cdr: ChangeDetectorRef,
              private renderer: Renderer2) {
  }

  onMouseOver = (event: any) => {
    if (!this.isPresent) {
      return;
    }
    const element = this.popoverElement.nativeElement;
    if (!element || !this.popoverDirective) {
      return;
    }
    if (element.contains(event.target) || this.popoverDirective.getNativeElement().contains(event.target)) {
      return;
    }

    this.hidePopover();
    this.onCloseFromOutside.emit();
    this.onShown.emit(false);
  }

  ngAfterViewInit() {
    this.showPopover();
    this.cdr.detectChanges();
  }

  showPopover(): void {
    if (!this.popoverDirective || !this.popoverDirective.getNativeElement()) {
      return;
    }
    this.isPresent = true;
    this.cdr.detectChanges();

    let position = { top: null, left: null };

    if (this.appendToSelector) {
      window.document.querySelector(this.appendToSelector).appendChild(this.popoverElement.nativeElement);
      position = this.getElementCustomPosition(this.popoverDirective.getNativeElement(), this.popoverElement.nativeElement);
    } else {
      position = this.getElementPosition(this.popoverDirective.getNativeElement(), this.popoverElement.nativeElement);
    }

    this.topShift = position.top;
    this.leftShift = position.left;
    this.listenMouseEventFunction = this.renderer.listen('document', 'mouseover', (event: any) => this.onMouseOver(event));

    this.onShown.emit(true);
  }

  hidePopover(): void {
    this.topShift = this.hiddenTopPosition;
    this.leftShift = this.hiddenLeftPosition;
    this.isPresent = false;
    this.listenMouseEventFunction();
    this.popoverDirective.hidePopoverElement();
  }

  hideContentFromPopover() {
    this.topShift = this.hiddenTopPosition;
    this.leftShift = this.hiddenLeftPosition;
    this.isPresent = false;
  }

  protected getElementPosition(hostElement: HTMLElement, targetElement: HTMLElement): { top: number, left: number } {
    const placement = this.placement;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const hostElPos = hostElement.getBoundingClientRect();
    const targetElWidth = targetElement.offsetWidth;
    const targetElHeight = targetElement.offsetHeight;
    const sidebarWidth = document.getElementById('sidebar') && document.getElementById('sidebar').offsetWidth || 0;
    const headerHeight = document.getElementById('header') && document.getElementById('header').offsetHeight || 0;
    const anchorPanelHeight = document.querySelector('#anchor-panel.sticky') &&
                              document.querySelector('#anchor-panel.sticky').clientHeight || 0;
    const targetElHalfWidth = Math.round(targetElWidth / 2);
    const targetElHalfHeight = Math.round(targetElHeight / 2);
    const margin = 10;

    const shiftWidth = function (): number {

      switch (placement) {
        case 'right': {
          if (windowWidth + sidebarWidth <= (hostElPos.right + targetElWidth)) {
            if (hostElPos.right + sidebarWidth >= windowWidth) {
              return hostElPos.right - (windowWidth + sidebarWidth);
            }

            return windowWidth - hostElPos.right - targetElWidth;
          }

          return hostElPos.width - margin;
        }

        case 'left': {
          if (sidebarWidth >= hostElPos.left - targetElWidth) {
            return sidebarWidth - hostElPos.left;
          }

          return - targetElWidth - margin;
        }

        default: {
          if (windowWidth <= (hostElPos.right + targetElHalfWidth)) {
            if (hostElPos.right >= windowWidth) {
              return hostElPos.right - windowWidth;
            }

            return windowWidth - hostElPos.right - targetElWidth;
          }

          if (sidebarWidth >= hostElPos.left - targetElHalfWidth) {
            return sidebarWidth - hostElPos.left;
          }

          return - Math.abs(targetElHalfWidth - hostElPos.width);
        }
      }
    };

    const shiftHeight = function (): number {
      switch (placement) {
        case 'right':
          if (windowWidth > (hostElPos.right + targetElWidth)) {
            if (windowHeight <= hostElPos.bottom + targetElHeight &&
              headerHeight + anchorPanelHeight <= hostElPos.top - targetElHeight) {
              return - Math.abs(targetElHeight - hostElPos.height);
            }

            if (windowHeight <= hostElPos.bottom + targetElHeight &&
              headerHeight + anchorPanelHeight <= hostElPos.top - targetElHalfHeight) {
              return - Math.abs(targetElHalfHeight - hostElPos.height);
            }
          }

          if (windowWidth <= (hostElPos.right + targetElWidth)) {
            return hostElPos.height;
          }

          return - hostElPos.height;
        case 'left':
          if (sidebarWidth < hostElPos.left - targetElWidth) {
            if (windowHeight <= hostElPos.bottom + targetElHeight &&
              headerHeight + anchorPanelHeight <= hostElPos.top - targetElHeight) {
              return - Math.abs(targetElHeight - hostElPos.height);
            }

            if (windowHeight <= hostElPos.bottom + targetElHeight &&
              headerHeight + anchorPanelHeight <= hostElPos.top - targetElHalfHeight) {
              return - Math.abs(targetElHalfHeight - hostElPos.height);
            }
          }

          if (sidebarWidth >= hostElPos.left - targetElWidth) {
            return hostElPos.height;
          }

          return - hostElPos.height;
        default:
          if (windowHeight <= hostElPos.bottom + targetElHeight &&
            headerHeight + anchorPanelHeight <= hostElPos.top - targetElHeight) {
            return - Math.abs(targetElHeight + hostElPos.height);
          }

          return hostElPos.height;
      }
    };

    return {
      top: shiftHeight(),
      left: shiftWidth()
    };
  }

  protected getElementCustomPosition(hostElement: HTMLElement, targetElement: HTMLElement): { top: number, left: number } {
    const placement = this.placement;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const hostElPos = this.getNativeElementPositionAndSize(hostElement);
    const relativeHostElPos = hostElement.getBoundingClientRect();
    const targetElWidth = targetElement.offsetWidth;
    const targetElHeight = targetElement.offsetHeight;
    const sidebarWidth = document.getElementById('sidebar') && document.getElementById('sidebar').offsetWidth || 0;
    const headerHeight = document.getElementById('header') && document.getElementById('header').offsetHeight || 0;
    const anchorPanelHeight = document.querySelector('#anchor-panel.sticky') &&
      document.querySelector('#anchor-panel.sticky').clientHeight || 0;
    const shift = this.shift;
    const targetElHalfWidth = Math.round(targetElWidth / 2);
    const targetElHalfHeight = Math.round(targetElHeight / 2);
    const margin = 10;
    const scrollWidth = 20;

    const positionPopoverWithWidth = (sidebarWidth + hostElPos.left + hostElPos.width + targetElWidth);
    const positionPopoverWithHalfWidth = (sidebarWidth + hostElPos.left + hostElPos.width + targetElHalfWidth);
    const positionPopoverWithHeight = hostElPos.top + hostElPos.height + targetElHeight + headerHeight + anchorPanelHeight;

    const shiftWidth = function (): number {
      switch (placement) {
        case 'right':
          if (windowWidth <= positionPopoverWithWidth) {
            return windowWidth - sidebarWidth - targetElWidth - scrollWidth;
          }

          return hostElPos.left + hostElPos.width;
        case 'left':
          if ((hostElPos.left + sidebarWidth) - targetElWidth <= 0) {
            return 0;
          }

          return hostElPos.left - targetElWidth - margin;
        default :
          if (windowWidth <= positionPopoverWithHalfWidth) {
            return windowWidth - sidebarWidth - targetElWidth - scrollWidth;
          }

          if ((hostElPos.left + sidebarWidth) - targetElHalfWidth <= 0) {
            return 0;
          }

          return (hostElPos.left + Math.round(hostElPos.width / 2)) - targetElHalfWidth;
      }
    };

    const shiftHeight = function (): number {
      switch (placement) {
        case 'right':
          if (windowWidth > positionPopoverWithWidth) {
            if (windowHeight <= positionPopoverWithHeight &&
              headerHeight + anchorPanelHeight <= relativeHostElPos.top - targetElHeight) {
              return hostElPos.top - (targetElHeight - hostElPos.height);
            }

            if (windowHeight <= positionPopoverWithHeight &&
              headerHeight + anchorPanelHeight <= relativeHostElPos.top - targetElHalfHeight) {
              return hostElPos.top - (targetElHalfHeight - hostElPos.height);
            }
          }

          if (windowWidth <= positionPopoverWithWidth) {
            return hostElPos.top + hostElPos.height + shift.y;
          }

          return hostElPos.top - hostElPos.height + shift.y;
        case 'left':
          if ((hostElPos.left + sidebarWidth) - targetElWidth > 0) {
            if (windowHeight <= positionPopoverWithHeight &&
              headerHeight + anchorPanelHeight <= relativeHostElPos.top - targetElHeight) {
              return hostElPos.top - (targetElHeight - hostElPos.height);
            }

            if (windowHeight <= positionPopoverWithHeight &&
              headerHeight + anchorPanelHeight <= relativeHostElPos.top - targetElHalfHeight) {
              return hostElPos.top - (targetElHalfHeight - hostElPos.height);
            }
          }

          if ((hostElPos.left + sidebarWidth) - targetElWidth <= 0) {
            return hostElPos.top + hostElPos.height + shift.y;
          }

          return hostElPos.top - hostElPos.height + shift.y;
        default:
          if (windowHeight <= positionPopoverWithHeight &&
            headerHeight + anchorPanelHeight <= relativeHostElPos.top - targetElHeight) {
            return hostElPos.top - (targetElHeight + hostElPos.height);
          }

          return hostElPos.top + hostElPos.height + shift.y;
      }
    };

    return {
      top: shiftHeight(),
      left: shiftWidth()
    };
  }

  private getNativeElementPositionAndSize(nativeElement: HTMLElement): { width: number, height: number, top: number, left: number } {
    let offsetParentBoundingClientRectangle = { top: 0, left: 0 };
    const elementBoundingClientRectangle = PopoverComponent.getNativeElementOffsetAndSize(nativeElement);
    const offsetParentElement = this.getParentOffsetElement(nativeElement);
    if (offsetParentElement !== window.document) {
      offsetParentBoundingClientRectangle = PopoverComponent.getNativeElementOffsetAndSize(offsetParentElement);
      offsetParentBoundingClientRectangle.top += offsetParentElement.clientTop - offsetParentElement.scrollTop;
      offsetParentBoundingClientRectangle.left += offsetParentElement.clientLeft - offsetParentElement.scrollLeft;
    }

    const boundingClientRectangle = nativeElement.getBoundingClientRect();
    return {
      width: boundingClientRectangle.width || nativeElement.offsetWidth,
      height: boundingClientRectangle.height || nativeElement.offsetHeight,
      top: elementBoundingClientRectangle.top - offsetParentBoundingClientRectangle.top,
      left: elementBoundingClientRectangle.left - offsetParentBoundingClientRectangle.left
    };
  }

  private getParentOffsetElement(nativeEl: HTMLElement): any {
    let offsetParent: any = nativeEl.offsetParent || window.document;
    while (offsetParent && offsetParent !== window.document && PopoverComponent.checkElementStaticPosition(offsetParent)) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || window.document;
  }
}

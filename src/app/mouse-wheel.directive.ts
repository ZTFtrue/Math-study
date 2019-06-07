import { Directive, Output, HostListener, EventEmitter, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMouseWheel]'
})
export class MouseWheelDirective {
  elementMouseMove = false;
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  @Output() mouseMove = new EventEmitter();
  @Output() mouseDown = new EventEmitter();
  @Output() mouseUp = new EventEmitter();
  @Output() mouseLeave = new EventEmitter();
  @Output() mouseMoveEnd = new EventEmitter();
  @Input() forbidCopy = false;
  @Input() useBrowser = false;
  constructor() {
  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
    if (!this.useBrowser) {
      if (this.elementMouseMove) {
        this.mouseMove.emit(event);
      }
    }
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event: any) {
    this.mouseDown.emit(event);
    if ((event.button === 0 && !this.forbidCopy) || event.button === 2 || event.button === 1) {
      this.elementMouseMove = true;
    }
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event: any) {
    // this.mouseWheelFunc(event);
    this.mouseMoveEnd.emit(event);
    this.mouseLeave.emit(event);
    this.elementMouseMove = false;
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event: any) {
    this.mouseMoveEnd.emit(event);
    this.mouseUp.emit(event);
    this.elementMouseMove = false;
  }
  @HostListener('contextmenu', ['$event']) onContextMenu(event: any) {
    event.preventDefault();
  }
  mouseWheelFunc(event: any) {
    if (!this.useBrowser) {
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      if (delta > 0) {
        this.mouseWheelUp.emit(event);
      } else if (delta < 0) {
        this.mouseWheelDown.emit(event);
      }
      event.preventDefault();
    }
  }

}

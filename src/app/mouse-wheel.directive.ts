import { Directive, Output, HostListener, EventEmitter, ElementRef } from '@angular/core';

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
  constructor() { }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
    if (this.elementMouseMove) {
      this.mouseMove.emit(event);
    }
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event: any) {
    this.mouseDown.emit(event);
    this.elementMouseMove = true;
    console.log(event);
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event: any) {
    // this.mouseWheelFunc(event);
    this.mouseLeave.emit(event);
    this.elementMouseMove = false;
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event: any) {
    this.mouseUp.emit(event);
    this.elementMouseMove = false;
  }
  @HostListener('contextmenu', ['$event']) onContextMenu(event: any) {
    console.log(event);
    event.preventDefault();
    // this.mouseUp.emit(event);
    // this.elementMouseMove = false;
  }
  mouseWheelFunc(event: any) {
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {
      this.mouseWheelUp.emit(event);
    } else if (delta < 0) {
      this.mouseWheelDown.emit(event);
    }
    event.preventDefault();
  }

}

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color="#78c4b2";
    // el.nativeElement.style.border="1px solid green";
  }

}

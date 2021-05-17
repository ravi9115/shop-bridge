/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Directive, ElementRef, HostBinding, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: 'input[appInput], textarea[appInput]',
  exportAs: 'appInput',
})
export class InputDirective {
  @HostBinding('class') classes = 'app-input form-control';

  focused$: Observable<boolean>;

  private focusedStream$ = new BehaviorSubject<boolean>(false);

  constructor(private elementRef: ElementRef, @Optional() @Self() public ngControl: NgControl) {
    this.focused$ = this.focusedStream$.asObservable().pipe(debounceTime(1));
  }

  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  focusChanged(isFocused: boolean): void {
    if (
      isFocused !== this.focusedStream$.value &&
      (!this.elementRef.nativeElement.readonly || !isFocused)
    ) {
      this.focusedStream$.next(isFocused);
    }
  }
}

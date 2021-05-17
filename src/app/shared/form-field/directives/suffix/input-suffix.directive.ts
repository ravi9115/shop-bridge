import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[appInputSuffix]' })
export class InputSuffixDirective {
  @HostBinding('class') classes = 'app-input-suffix';
}

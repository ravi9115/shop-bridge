import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[appInputPrefix]' })
export class InputPrefixDirective {
  @HostBinding('class') classes = 'app-input-prefix';
}

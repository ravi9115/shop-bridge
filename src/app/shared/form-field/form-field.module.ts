import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './components/error/error.component';
import { HintComponent } from './components/hint/hint.component';
import { IconComponent } from './components/icon/icon.component';
import { LabelComponent } from './components/label/label.component';
import { InputDirective } from './directives/input/input.directive';
import { InputPrefixDirective } from './directives/prefix/input-prefix.directive';
import { InputSuffixDirective } from './directives/suffix/input-suffix.directive';
import { FormFieldComponent } from './form-field.component';
import { InputErrorPipe } from './pipes/input-error.pipe';

const EXPORTS = [
  FormFieldComponent,
  LabelComponent,
  ErrorComponent,
  IconComponent,
  HintComponent,
  InputDirective,
  InputPrefixDirective,
  InputSuffixDirective,
  InputErrorPipe,
];

@NgModule({
  imports: [CommonModule],
  exports: [...EXPORTS],
  declarations: [...EXPORTS],
})
export class FormFieldModule {}

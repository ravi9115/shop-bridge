import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ContentChild,
  AfterContentInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { InputDirective } from './directives/input/input.directive';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {
  @Input() classNames = '';
  @ContentChild(InputDirective) input: InputDirective;

  destroyed$ = new Subject<boolean>();

  get isTouched(): boolean | null {
    return this.input?.ngControl.control.touched;
  }

  get isInvalid(): boolean | null {
    return this.input?.ngControl.control.invalid;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngAfterContentInit(): void {
    this.input.ngControl.control.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.cdr.markForCheck());
  }
}

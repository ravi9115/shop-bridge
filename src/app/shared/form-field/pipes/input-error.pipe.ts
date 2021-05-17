import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'inputError',
})
export class InputErrorPipe implements PipeTransform {
  transform(value: ValidationErrors, errorsMapping?: ValidationErrors): string {
    if (!value) {
      return null;
    }

    const keys = Object.keys(value);

    if (!errorsMapping) {
      return value[keys[0]];
    }

    const errorKey = keys.find(key => !!errorsMapping[key]);
    console.log(keys, errorKey, errorsMapping, value);
    const error = errorsMapping[errorKey] ?? value[errorKey] ?? value[keys[0]];
    return error;
  }
}

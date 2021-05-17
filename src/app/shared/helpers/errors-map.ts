import { ValidationErrors } from '@angular/forms';

export const getErrorsMap = (entityName = 'This field'): ValidationErrors => ({
  pattern: `${entityName} is not valid`,
  required: 'This field is required',
});

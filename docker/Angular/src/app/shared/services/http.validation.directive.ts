import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[HttpsValidator]',
  standalone: true, // Standalone directive
  providers: [
    { provide: NG_VALIDATORS, useExisting: HttpsValidatorDirective, multi: true }
  ]
})
export class HttpsValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && typeof value === 'string' && value.startsWith('https://')) {
      return null; // Valid input
    }
    return { invalidHttps: true }; // Invalid input
  }
}

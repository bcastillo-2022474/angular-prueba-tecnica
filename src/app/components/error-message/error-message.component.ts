import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input({required: true}) control!: AbstractControl;
  @Input({required: true}) errors!: string[];

  errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'This field should be a valid email',
    minlength: 'This field should be 3 letters long minimum',
    min: 'This field should be 0.1 or more',
    mismatch: 'Passwords do not match',
    // ^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$
    pattern: 'This field should contain at least 1 letter and 1 number',
  }

  getErroMessage() {
    for (const error of this.errors) {
      if (this.control.hasError(error)) {
        return this.errorMessages[error];
      }
    }
    return '';
  }

}

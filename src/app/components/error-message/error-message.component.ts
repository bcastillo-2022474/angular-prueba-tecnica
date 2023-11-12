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
    passwordMismatch: 'Passwords do not match',
  }
}

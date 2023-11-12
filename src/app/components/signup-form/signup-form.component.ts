import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

type UserType = "ADMIN" | "COMMON"
type FormFields = { type: string, name: string, errors: string[], controlName: string, placeholder: string }

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirm_password');

  // check if password and confirm password fields match
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    // if they don't match, return error object
    return {passwordMismatch: true};
  }

  // if they match, return null
  return null;
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  myForm!: FormGroup;
  fb = inject(FormBuilder)
  formFields: FormFields[] = [
    {
      type: 'text',
      name: 'name',
      errors: ['required', 'minlength'],
      controlName: 'name',
      placeholder: 'John Doe'
    },
    {
      type: 'text',
      name: 'email',
      errors: ['required', 'email'],
      controlName: 'email',
      placeholder: 'johndoe@email.com',
    },
    {
      type: 'password',
      name: 'password',
      errors: ['required', 'pattern'],
      controlName: 'password',
      placeholder: '8+ characters, 1+ letter, 1+ number'
    },
    {
      type: 'confirm_password',
      name: 'Confirm Password',
      errors: ['required', 'passwordMismatch'],
      controlName: 'password',
      placeholder: ''
    },
  ]

  trackByFn(_: number, item: FormFields) {
    return item.name;
  };

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required, Validators.minLength(3)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')],
      confirm_password: ['', passwordMatchValidator],
      // select
      userType: [null, Validators.required]
    })
  }

}

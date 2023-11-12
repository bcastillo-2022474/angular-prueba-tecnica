import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService, UserType} from "../../services/auth.service";
import {wait} from "../../constants";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";

type Form = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  userType: UserType
}

type FormFields = { type: string, name: string, errors: string[], controlName: string, placeholder: string }

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  myForm!: FormGroup;
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private toastService = inject(ToastService)
  private router = inject(Router)
  loading = false;
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
      errors: ['required', 'minlength', 'pattern'],
      controlName: 'password',
      placeholder: '8+ characters, 1+ letter, 1+ number'
    },
    {
      type: 'password',
      name: 'Confirm Password',
      errors: ['required', 'mismatch'],
      controlName: 'confirmPassword',
      placeholder: ''
    },
  ]

  trackByFn(_: number, item: FormFields) {
    return item.name;
  };

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      confirmPassword: ['', [Validators.required]],
      // select
      userType: [null, Validators.required]
    });

    this.setValidatePasswordConfirmation();
  }

  setValidatePasswordConfirmation() {
    this.myForm.get('password')?.valueChanges.subscribe((value) => {
      const isSame = this.myForm.get('confirmPassword')?.value === value;
      // if isSame then set to invalid
      if (!isSame) {
        this.myForm.get('confirmPassword')?.setErrors({mismatch: true})
      }

      this.myForm.get('confirmPassword')?.updateValueAndValidity();
    })

    this.myForm.get('confirmPassword')?.valueChanges.subscribe((value) => {
      const isSame = this.myForm.get('password')?.value === value;
      // if isSame then set to invalid
      if (!isSame) {
        this.myForm.get('confirmPassword')?.setErrors({mismatch: true})
      }
    })
  }

  signUp() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      this.toastService.show('Campos Incompletos! Por favor, complete los campos', 'danger');
      return;
    }
    this.loading = true;
    const {email, password, name, userType}: Form = this.myForm.getRawValue();

    this.authService.signUp(email, password, name, userType).subscribe({
      next: () => {
        wait(1).then(() => {
          this.loading = false;
          this.toastService.show('Tu cuenta ha sido creada exitosamente!')
          this.router.navigate(['/'])
        })
      },
      error: (err) => {
        this.loading = false;
        this.toastService.show(`${err.error.message} ${err.message}`, 'danger');
      }
    })
  }

}

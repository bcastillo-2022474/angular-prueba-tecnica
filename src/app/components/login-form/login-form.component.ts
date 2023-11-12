import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {wait} from "../../constants";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";

type FormFields = { type: string, name: string, errors: string[], controlName: string, placeholder: string }

type Form = {
  email: string,
  password: string,
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  myForm!: FormGroup;
  private authService = inject(AuthService);
  private toastService = inject(ToastService)
  private router = inject(Router)
  loading = false;
  formFields: FormFields[] = [
    {
      type: 'text',
      name: 'email',
      errors: ['required', 'email'],
      controlName: 'email',
      placeholder: 'Johndoe@email.com'
    },
    {
      type: 'password',
      name: 'contraseña',
      errors: ['required'],
      controlName: 'password',
      placeholder: '8+ characters, 1+ letter, 1+ number'
    }
  ];

  trackByFn(_: number, item: FormFields) {
    return item.controlName;
  };

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }


  login() {
    if (this.loading) return;
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      this.toastService.show("Campos Incompletos! Por favor, complete los campos", "danger");
      return;
    }

    this.loading = true;
    const {email, password}: Form = this.myForm.getRawValue();
    this.authService.login({email, password}).subscribe({
      next: () => {
        wait(1).then(() => {
          this.loading = false;
          this.toastService.show("Login exitoso");
          this.router.navigate(['/'])
        });
      },
      error: err => {
        wait(1).then(() => {
          this.loading = false;
          this.toastService.show(`${err.error.message} ${err.message} `, 'danger')
        })
      }
    })
  }
}

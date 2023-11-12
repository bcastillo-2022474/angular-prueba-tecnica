import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

type FormFields = { type: string, name: string, errors: string[], controlName: string, placeholder: string }

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  myForm!: FormGroup;
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
      errors: ['required', 'pattern'],
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
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    })
  }


}

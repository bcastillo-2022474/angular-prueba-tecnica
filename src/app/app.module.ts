import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SendingPageComponent} from './pages/sending-page/sending-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {
  ShippingCalculatorFormComponent
} from './components/shipping-calculator-form/shipping-calculator-form.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ToastComponent } from './components/toast/toast.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    SendingPageComponent,
    ErrorMessageComponent,
    ShippingCalculatorFormComponent,
    LoginFormComponent,
    LoginComponent,
    SignUpComponent,
    SignupFormComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

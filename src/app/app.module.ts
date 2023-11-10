import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SendingPageComponent} from './pages/sending-page/sending-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {
  ShippingCalculatorFormComponent
} from './components/shipping-calculator-form/shipping-calculator-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SendingPageComponent,
    ErrorMessageComponent,
    ShippingCalculatorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

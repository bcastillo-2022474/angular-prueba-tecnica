import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ShippingCalculationService {

  private http = inject(HttpClient);

  shippingCalculation(data: {
    weight: number;
    width: number;
    height: number;
    destinationCountry: string;
    length: number;
    originCountry: string,
    user?: { name: string, email: string, userType: string, userId: number }
  }) {
    return this.http.post(`${API}/shipping/calculate`, data);
  }
}

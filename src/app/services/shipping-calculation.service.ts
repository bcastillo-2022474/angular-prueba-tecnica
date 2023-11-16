import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment"
import {catchError, throwError} from "rxjs";
import {ToastService} from "./toast.service";

@Injectable({
    providedIn: 'root'
})
export class ShippingCalculationService {

    private http = inject(HttpClient);
    private toastService = inject(ToastService)

    shippingCalculation(data: {
        weight: number;
        width: number;
        height: number;
        destinationCountry: string;
        length: number;
        originCountry: string,
        user?: { name: string, email: string, userType: string, userId: number }
    }) {
        return this.http.post(`${environment.API}/shipping/calculate`, data).pipe(
            catchError(err => {
                this.toastService.show('Error calculando costo de envío', 'danger')
                return throwError(() => err);
            })
        )
    }
}

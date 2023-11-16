import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment"
import {ToastService} from "./toast.service";

export type Region = {
    regionId: number,
    name: string,
}

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    private http = inject(HttpClient)
    private toastService = inject(ToastService)

    getRegions(): Observable<Region[]> {
        return this.http.get<Region[]>(`${environment.API}/regions`).pipe(
            catchError(err => {
                this.toastService.show("Error al cargar las regiones", "danger")
                return of([])
            })
        )
    }
}

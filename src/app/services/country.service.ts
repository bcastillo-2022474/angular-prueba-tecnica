import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API} from "../constants";
import {ToastService} from "./toast.service";

export type Country = {
  countryId: number,
  name: string,
  regionId: number,
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)
  private toastService = inject(ToastService)

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${API}/countries`).pipe(
      catchError(err => {
        this.toastService.show("Error al cargar los países", "danger")
        return of([])
      })
    )
  }

  getCountriesByRegion(region_id: number): Observable<Country[]> {
    return this.http.get<Country[]>(`${API}/countries/region/${region_id}`).pipe(
      catchError(err => {
        this.toastService.show(`Error al cargar los países de region con id ${region_id}`, "danger")
        return of([])
      })
    );
  }
}

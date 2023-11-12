import {inject, Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API} from "../constants";

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

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${API}/countries`)
  }

  getCountriesByRegion(region_id: number): Observable<Country[]> {
    return this.http.get<Country[]>(`${API}/countries/region/${region_id}`)
  }
}

import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

export type Country = {
  country_id: number,
  name: string,
  region_id: number,
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  countries: Country[] = [
    {country_id: 1, name: 'Russia', region_id: 1},
    {country_id: 2, name: 'USA', region_id: 4},
    {country_id: 3, name: 'China', region_id: 2},
    {country_id: 4, name: 'India', region_id: 2},
    {country_id: 5, name: 'Japan', region_id: 2},
    {country_id: 6, name: 'Germany', region_id: 1},
    {country_id: 7, name: 'France', region_id: 1},
    {country_id: 8, name: 'United Kingdom', region_id: 1},
    {country_id: 9, name: 'Italy', region_id: 1},
    {country_id: 10, name: 'South Korea', region_id: 2},
  ]

  constructor() {
  }

  getCountries(): Observable<Country[]> {
    return of(this.countries)
  }
}

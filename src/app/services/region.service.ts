import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

export type Region = {
  region_id: number,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  regions: Region[] = [
    {region_id: 1, name: 'Europe'},
    {region_id: 2, name: 'Asia'},
    {region_id: 3, name: 'Africa'},
    {region_id: 4, name: 'North America'},
    {region_id: 5, name: 'South America'},
    {region_id: 6, name: 'Oceania'},
  ]

  constructor() {
  }

  getRegions(): Observable<Region[]> {
    return of(this.regions)
  }
}

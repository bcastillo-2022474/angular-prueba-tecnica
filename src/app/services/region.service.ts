import {inject, Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API} from "../constants";

export type Region = {
  regionId: number,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private http = inject(HttpClient)

  // regions: Region[] = [
  //   {region_id: 1, name: 'Europe'},
  //   {region_id: 2, name: 'Asia'},
  //   {region_id: 3, name: 'Africa'},
  //   {region_id: 4, name: 'North America'},
  //   {region_id: 5, name: 'South America'},
  //   {region_id: 6, name: 'Oceania'},
  // ]

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${API}/regions`)
  }
}

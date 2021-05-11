import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {GeoAndTimeQuery} from "../model/geo-and-time-query.model";

@Injectable({
  providedIn: 'root'
})
export class GeoSearchService {

  constructor(private http: HttpClient) { }

  public findCity(simpleQuery:ISimpleQuery): Observable<any> {
    return this.http.post(environment.baseUrl + 'api/search/city',simpleQuery);
  }

  public geoAndTimeSearch(geoAndTimeQuery: GeoAndTimeQuery): Observable<any> {
    return this.http.post(environment.baseUrl+'api/search/geoPoint',geoAndTimeQuery);
  }

  public findAllCitiesStartWith(name:string): Observable<any> {
    return this.http.get(environment.baseUrl + 'api/search/cities/'+name);
  }

}

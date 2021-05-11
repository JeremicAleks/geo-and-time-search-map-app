import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserModel} from "../model/user.model";
import {PageableRequest} from "../model/pageable-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public getAllEnabledUsers(): Observable<any> {
    return this.http.get(environment.baseUrl + 'management/api/user/enabled');
  }

  public getAllDisabledUsers(): Observable<any> {
    return this.http.get(environment.baseUrl + 'management/api/user/disabled');
  }

  public enableUser(user:UserModel):Observable<any> {
    return this.http.post(environment.baseUrl+'management/api/user/enableUser',user);
  }

  public disableUser(user:UserModel):Observable<any> {
    return this.http.post(environment.baseUrl+'management/api/user/disableUser',user);
  }

  public getPageableUsers(pageableRequest: PageableRequest): Observable<any> {
    return this.http.post(environment.baseUrl + 'management/api/user/pageable',pageableRequest);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {AuthToken} from "../model/authToken.model";
import {environment} from "../../../environments/environment";
import {RegistrationModel} from "../../common/model/registration.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  public isAuthenticated():boolean {
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  public isHeadAdmin(){
    const jwtHelperService = new JwtHelperService();
    const decodedToken = jwtHelperService.decodeToken(localStorage.getItem('token'));

    if(decodedToken != null){
      if(decodedToken.authorities[0] === 'HEAD_ADMIN') {
        return true;
      }
    }
    return false;
  }

  public isAdmin() {
    const jwtHelperService = new JwtHelperService();
    const decodedToken = jwtHelperService.decodeToken(localStorage.getItem('token'));

    if(decodedToken != null){
      if(decodedToken.authorities[0] === 'ADMIN') {
        return true;
      }
    }
    return false;
  }

  public isUser() {
    const jwtHelperService = new JwtHelperService();
    const decodedToken = jwtHelperService.decodeToken(localStorage.getItem('token'));

    if(decodedToken != null){
      if(decodedToken.authorities[0] === 'USER') {
        return true;
      }
    }
    return false;
  }



  getAccessToken(username: string,password: string): Observable<AuthToken> {
    let oauth2_token_endpoint = environment.baseUrl + 'oauth/token';
    let oauth2_client_id = 'GeoAndTime';
    let oauth2_client_secret = 'secret';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = 'client_id={0}&client_secret={1}&grant_type=password&username={2}&password={3}'
      .replace('{0}', oauth2_client_id)
      .replace('{1}', oauth2_client_secret)
      .replace('{2}', username)
      .replace('{3}', password);

    return this.http.post<AuthToken>(oauth2_token_endpoint, body, httpOptions);
  }

  getUsernameFromToken(): string {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));

    if (decodedToken != null) {
      return decodedToken.user_name;
    }
    return '';
  }

  userRegistration(data:RegistrationModel): Observable<any> {
    return this.http.post(environment.baseUrl+'authentication/registration',data);
  }


}

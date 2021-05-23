import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../../common/service/token.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    if (this.tokenService.getToken() !== undefined)
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenService.getToken()}`
        }
      });

    return next.handle(authReq);  }

}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";

@Injectable()
export class IsHeadAdminGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isHeadAdmin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private autService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.autService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}

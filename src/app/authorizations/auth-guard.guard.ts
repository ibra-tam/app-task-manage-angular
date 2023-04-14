/**
 * @author SEYDI IBRAHIMA TAMSIR
 */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
;

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = localStorage.getItem('token');
    console.log('user outidji', user);
    if (user) {
      return true;
    } else {
      this.router.navigate(['/account/login'],
      {
        queryParams: { returnUrl: state.url },
      });
     
      return false;
    }
  }
}

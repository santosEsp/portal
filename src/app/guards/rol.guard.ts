import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {LoginService} from '../services/login/login.service'
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private verifyRol: LoginService, private router: Router) {}
  canActivate(): boolean {
      if (this.verifyRol.rolAdmin()) {
        return true;
      } else {
        this.router.navigateByUrl('/negocios');
        return false;
      }
  }
}

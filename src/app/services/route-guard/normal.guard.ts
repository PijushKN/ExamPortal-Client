import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../AuthenticationService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isloggedIn() && this.auth.getUserRole()=='NORMAL'){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}

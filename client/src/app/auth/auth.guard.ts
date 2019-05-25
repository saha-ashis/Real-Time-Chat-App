import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService : UserService, private router : Router){

  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.userService.isUserLoggedIn()){
        this.router.navigateByUrl('/signin');
        this.userService.removeTheJwtToken();
        return false;
      }
      return true;
  }
}

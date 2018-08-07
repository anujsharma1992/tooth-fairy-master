import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Observable } from "rxjs/Rx";
 
@Injectable()
export class VendorAuthGuard implements CanActivate {
     public res;
     public cnt = 0;
    constructor(private _router: Router, private _userService: UserService, private _authService: AuthService) { }
 
    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
        if (localStorage.getItem('vendor')) {
            // logged in so return true
            return true;
        }
        if(!this.isLogin()) {
            console.log('if');
            this._authService.logout(1);
            return false;
        } else {
            console.log('else');
            return true;
        }
          // return this._userService.getVendorDetails(localStorage.getItem('vendor'))
            // .map((userData) => {
              // if(userData) {
                      // if(userData.username) { 
                          // this.cnt++
						  // console.log('move to dashboard');
                          // this._router.navigate(['dashboard']); 
                          // return true;
                      // }
                  // return true;
              // } else {
                // // not logged in so redirect to login page
                  // this._authService.logout(1);
                  // return false;
              // }
          // }).first();
    }

    isLogin() {
        
    }
}
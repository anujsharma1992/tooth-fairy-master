import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service';
import { Observable } from 'rxjs/Observable';
/* import firebase required modules */
// import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';

import {Subject} from 'rxjs/Subject';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
// Export component
export class AppComponent {
  public isPlanActive = localStorage['vendor_details'] != null && typeof localStorage['vendor_details'] != 'undefined' && localStorage['vendor_details'] && JSON.parse(localStorage['vendor_details'])['is_plan_active'] == -1 ? false : true;
  // public isPlanActive = true;
  // public user: Observable<firebase.User>;
  // public item: FirebaseObjectObservable<any>;
  // constructor(private _router: Router, private _authService: AuthService, public afAuth: AngularFireAuth, public afd: AngularFireDatabase) { // all Dependency should be injected here before use
  // 	  this.user = afAuth.authState;
  // 	  this.item = afd.object('/item');
  //     // afAuth.auth.createUserWithEmailAndPassword('email@latest.com','rest1234');
  // }

  constructor(private _router: Router, private _authService: AuthService, private _userService: UserService) { // all Dependency should be injected here before use
  }
  // save(newName: string) {
  //   this.item.set({ name: newName });
  // }
  // update(newSize: string) {
  //   this.item.update({ size: newSize });
  // }
  // delete() {
  //   this.item.remove();
  // }

  // login() {
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }

  // logout() {
  //   this.afAuth.auth.signOut();
  // }

  
  ngOnInit() {
    if(window.location.href.indexOf('admin') === -1)  {
      if(!this.isPlanActive) {
        this._router.navigate(['login']);
      }
    }
    // this._userService.getVendorDetails(localStorage.vendor)
    //   .subscribe(vendor => {
    //     if(vendor)
    //     localStorage.setItem("vendor_details", JSON.stringify(vendor.data));
    //     if(window.location.href.indexOf('admin') === -1)  {
    //       if(vendor.data.is_plan_active < 0) {
    //          this._router.navigate(['dashboard']);     
    //       }
    //     }
    //   }
    // );
      // if(window.location.href.indexOf('admin') === -1)  {
      //     if(localStorage.vendor) {
      //       this._userService.getVendorDetails(localStorage.vendor)
      //           .subscribe(vendor => {
      //               if(!vendor.data)  {
      //                 localStorage.removeItem('vendor_details');
      //                 localStorage.removeItem('vendor');
      //                 return this._router.navigate(['login']);
      //               } else {
      //                 if(vendor.data.is_approve < 0) {
      //                   localStorage.removeItem('vendor_details');
      //                   localStorage.removeItem('vendor');
      //                   this._router.navigate(['login']);
      //                 } else if(vendor.data.is_approve > 0) {
      //                   localStorage.setItem("vendor_details", JSON.stringify(vendor.data));
      //                 }  
      //               }
      //         });  
      //     }
      // }
  }



}

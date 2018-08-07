import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-admin-common-nav',
  templateUrl: './admin-common-nav.component.html',
  styleUrls: ['./admin-common-nav.component.css']
})
export class AdminCommonNavComponent implements OnInit {
  
  constructor(private _authService: AuthService,) { }

  ngOnInit() {
  }
  // Log out of application(Admin)
  logout() {
  	this._authService.logout(2);
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {
 constructor(private _userService: UserService) { }
	public notificationObj:any;
	public vendorDetail:any;
  ngOnInit() {
	this.notificationObj = JSON.parse(localStorage.getItem('PushSubscribe'));
	this.vendorDetail = JSON.parse(localStorage.getItem('admin'));
	try { 
	  var res = this._userService.subscribeUserByUid(this.vendorDetail, this.notificationObj);    
	} 
	catch(e) {
		alert("some error "+ e);
		return;
	}

	
  }
}
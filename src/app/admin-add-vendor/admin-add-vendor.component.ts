import { Component, OnInit } from '@angular/core';
import { AuthService, Vendor } from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-vendor',
  templateUrl: './admin-add-vendor.component.html',
  styleUrls: ['./admin-add-vendor.component.css']
})
export class AdminAddVendorComponent implements OnInit {
  public title = 'ToothFairy:Admin -> Add BO'
  public vendor = new Vendor('' , '', '', '', '', '', '', '','','','','','','');
	public errorMsg: string = '';
	public loader: boolean;
	public sucMsgVal: boolean = false;
	public sucMsg: string = '';
  constructor(private _router: Router, private _authService:AuthService) {
    console.log('add vendor from admin panel');
  }
	ngOnInit() {

	}
    /* Add Business owner */
	  async addBO() {
        // this.loader = true;
        // try {
            // var res = await this._authService.signUp(this.vendor);
        // }
        // catch(e) {
           // this.errorMsg = e.statusText;
           // if(typeof e._body != 'undefined' && Object.keys(e).length) {
             // if(typeof JSON.parse(e._body).error.parameter_name != 'undefined') {
               // console.log(typeof JSON.parse(e._body).error.parameter_name);
               // this.errorMsg = JSON.parse(e._body).error.parameter_name + ' is required';
             // } else {
               // this.errorMsg = JSON.parse(e._body).error;
             // }
           // }
           // this.loader = false;
           // return;
        // }
        // if(res.status !== 201) {
            // console.log('application error', res);
            // this.errorMsg = res.error.parameter_name+' is required';
        // } else {
            // this.sucMsgVal = true;
            // this.sucMsg = 'A new Business Owner account has been created successfully';
            // this.errorMsg = '';
            // this._router.navigate(['admin/users']);
        // }
        // this.loader = false;
    }

}

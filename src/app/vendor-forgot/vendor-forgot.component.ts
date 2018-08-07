import { Component, OnInit } from '@angular/core';
import { AuthService, Vendor } from '../services/auth.service'
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-forgot',
  templateUrl: './vendor-forgot.component.html',
  styleUrls: ['./vendor-forgot.component.css']
})
export class VendorForgotComponent implements OnInit {
	  public title = 'ToothFairy: Forgot Password'
    public vendor = new Vendor('' , '', '', '', '', '', '', '','','','','','','');
    public errorMsg: string = '';
    public sucMsg: string = '';
    public sucMsgVal: boolean = true;
     public loader: boolean;
  	constructor(private _router: Router, private _userService:UserService) {
      console.log('Vendor forgot page');
    }

  	ngOnInit() {
        if (localStorage.getItem("vendor") !== null){
            this._router.navigate(['dashboard']);
        } else {
            this._router.navigate(['forgot']);
        }
    }
    /* Login for Business Owners */
     async login() {
		  this.sucMsgVal = false;
        this.loader = true;
        if(this.vendor.email.trim() === '') {
            this.loader = false;
            this.errorMsg = 'Invalid Email or Password';
        } else {
            try {
                var res = await this._userService.forgotPassword(this.vendor.email);
				 this.sucMsg = "An email with reset password sent successfully.";
				 this.sucMsgVal = true;
            }
            catch(e) {
               this.errorMsg = 'Invalid Email or Password';
            }
            if(res["code"] != 200) {
                this.errorMsg = res.message;
            } else {
                this.errorMsg = '';
            } 
            this.loader = false;
        }
    }

}

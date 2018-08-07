import { Component, OnInit } from '@angular/core';
import { AuthService, Vendor } from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.css']
})
export class VendorLoginComponent implements OnInit {
	  public title = 'ToothFairy:LogIn'
    public vendor = new Vendor('' , '', '', '', '', '', '', '','','','','','','');
    public errorMsg: string = '';
     public loader: boolean;
  	constructor(private _router: Router, private _service:AuthService) {
      console.log('Vendor login page');
    }

  	ngOnInit() {
        if (localStorage.getItem("vendor") !== null){
            this._router.navigate(['dashboard']);
        } else {
            this._router.navigate(['login']);
        }
        // if(window.location.href.indexOf('admin') === -1)  {
       //   return this._authService.checkCredentials()  
       // }
    }
    /* Login for Business Owners */
     async login() {
        this.loader = true;
        if(this.vendor.email.trim() === '' || this.vendor.password === '') {
            this.loader = false;
            this.errorMsg = 'Invalid Email or Password';
        } else {
            try {
                var res = await this._service.login(this.vendor, 1);    
				console.log(res,'asd');
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

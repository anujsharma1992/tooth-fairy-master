import { Component, OnInit } from '@angular/core';
import { AuthService, Vendor } from '../services/auth.service'
import { Router } from '@angular/router';
declare var jQuery:any;
@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css']
})


export class VendorSignupComponent implements OnInit {
    public title = 'ToothFairy: Signup'
    public vendor = new Vendor('' , '', '', '', '', '', '', '','','','','','','');
    public errorMsg: string = '';
    public loader: boolean;
    public sucMsgVal: boolean = false;
    public sucMsg: string = '';
    public url: string = '';
    public addressObj: any = {field1:'', field2:'', field3:''};

    constructor(private _router: Router, private _authService: AuthService) {
      console.log('Vendor Signup page');
    }

  	ngOnInit() {
		this.vendor.title='Dr.';
		this.vendor.phone='+4';
		this.vendor.gender="m";
		jQuery('.dateOfBirth').datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: '1950:',
            maxDate: 0,
            dateFormat: 'mm/dd/yy',
            onSelect: function(dateStr) {     
                  var date = jQuery(this).datepicker('getDate');
                  if (date) {
                        date.setDate(date.getDate());
                  }
                  jQuery('.end_date').datepicker('option', 'maxDate', date);
              }
        });
        if (localStorage.getItem("vendor") !== null) {
            this._router.navigate(['dashboard']);
        } else {
            this._router.navigate(['signup']);
        }
    }

	readUrl(event:any) {
	  if (event.target.files && event.target.files[0]) {
		var reader = new FileReader();

		reader.onload = (event:any) => {
		  this.url = event.target.result;
		}

		reader.readAsDataURL(event.target.files[0]);
	  }
	}
    /* Login for Business Owners */
     async signUp() {
		  this.vendor.address = JSON.stringify({line1:this.addressObj.field1, line2:this.addressObj.field2,line3:this.addressObj.field3});
		 console.log(this.vendor);
       var curObj;
        this.loader = true;
        try {
		var inputValue = (<HTMLInputElement>document.getElementById('file'));
        var fileList: FileList = inputValue.files;
			// this.vendor.password=Math.random().toString();
			// this.vendor.userType="free";
			// this.vendor.realm="india";
			// this.vendor.username=Math.random().toString();
			
			this.vendor.dateOfBirth=(<HTMLInputElement>document.querySelector('.dateOfBirth')).value.split('/').join('-');
            var res = await this._authService.signUp(fileList, this.vendor);    
        }
        catch(e) {
           this.errorMsg = e.statusText;
           if(typeof e._body != 'undefined' && Object.keys(e).length) {
			   alert('some server related error '+ e);
           }
           this.loader = false;
           return;
        }

        if(res["code"] !== 201) {
            console.log(res, 'signup error message');
            this.errorMsg = res+' is required';
        } else {
			alert("your account has been registered and pending for activation from admin, once admin activate your account, password link will be sent on your registered email");
            this.sucMsgVal = true;
            this.sucMsg = 'Thank you for registering with toothfairy';
            // this.vendor = new Vendor('' , '', '', '', '', '', '');
            this.errorMsg = '';
            curObj = this;
            setTimeout(function() { 
              curObj._router.navigate(['login']);  
            }, 3000)
        } 
        this.loader = false;
    }

}

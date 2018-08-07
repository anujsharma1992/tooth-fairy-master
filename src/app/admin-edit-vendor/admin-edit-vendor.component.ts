import { Component, OnInit } from '@angular/core';
import { Vendor } from '../services/auth.service'
import { UserService } from '../services/user.service'
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery:any;

@Component({
  selector: 'app-admin-edit-vendor',
  templateUrl: './admin-edit-vendor.component.html',
  styleUrls: ['./admin-edit-vendor.component.css'],
  providers: [UserService]
})
export class AdminEditVendorComponent implements OnInit {
  	public title = 'ToothFairy:Admin -> Update BO'
    public errorMsg: string = '';
    public loader: boolean;
    public sucMsgVal: boolean = false;
    public sucMsg: string = '';
    /* Advance Details Fields */
    public vendor = new Vendor('' , '', '', '', '', '', '', '','','','','','','');
    
    constructor(private _userService: UserService, private _router: Router, private route: ActivatedRoute) { // all Dependency should be injected here before use
  	}
    /* on initializatin of Angular */
    ngOnInit() {
      	this.loader = true;
  	  	this.route.params.subscribe(
  	        params => {
  	        	var id = params['id'];
  				this._userService.getVendorDetails(id)
  				.subscribe(data => {
  					this.loader = false;
  			    	this.vendor = data.data;
  			    	console.log(this.vendor);
  	      });
  			});
  	}
    /* update Business owner profies */
    async updateVendorProfile() {
        this.loader = true;
        var inputValue = (<HTMLInputElement>document.getElementById('file'));
        var fileList: FileList = inputValue.files;
        if(fileList.length > 0) {
          var file: File = fileList[0];
        }
        try {
          var res = await this._userService.updateVendorProfile(file, this.vendor);      
        } 
        catch(e) {
          this.errorMsg = e.statusText;
          return;
        }
        if(res.status !== 200) {
            this.errorMsg = res.error.parameter_name+' is required';
        } else {
            this.sucMsgVal = true;
            this.sucMsg = 'User details have been updated successfully';
            this.errorMsg = '';
        }
        this.hideMsg();
        this.loader = false;
        this._router.navigate(['admin/users']);
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        //     )
    }

    /* Hide all informational messages from document */
    hideMsg() {
      setTimeout(function () {
        this.success = false;
        this.error = false;
        this.errMsgVal = ''
        this.sucMsgVal = ''
        this.addFormError  = false;
        this.addErrMsgVal = '';
      }.bind(this),5000)
    }


}

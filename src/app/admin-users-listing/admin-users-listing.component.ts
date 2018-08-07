import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AppSettings } from '../app-settings';
declare var jQuery:any;

@Component({
  selector: 'app-admin-users-listing',
  templateUrl: './admin-users-listing.component.html',
  styleUrls: ['./admin-users-listing.component.css'],
  providers: [UserService]
})
export class AdminUsersListingComponent implements OnInit {
    public users = [];
    public basePathimage : string;
    public loader: boolean;
	public error: boolean = false;
    public success: boolean = false;
	public sucMsgVal : string;
    public errMsgVal : string;
    public title = 'ToothFairy: Admin -> All App Users';

   constructor(private _router: Router, private _userService: UserService) { // all Dependency should be injected here before use
   }
   
   ngOnInit() {
        this.loader = true;
		this.basePathimage = `${AppSettings.STATIC_PATH}`;
    	this._userService.fetchAppUsers()
		    .subscribe(data => {
       		this.loader = false;
		  	this.users = data.result;
	        setTimeout(function() {
	             jQuery(function() {
	                jQuery('table.userdata').dataTable({
	                    "language": {
	                      "emptyTable": "No Record Found"
	                    },
	                    "columnDefs": [{
	                      "defaultContent": "N/A",
	                      "targets": "_all"
	                    }],
	                    "responsive": true,
	                    "aoColumnDefs": [
	                      {
	                         "bSortable": false,
	                         "aTargets": [ -1 ]
	                      }
	                    ],
	                    "aaSorting": []
	                });
	             })
	        }, 0)
		});
   }
hideMsg() {
	    setTimeout(function () {
	      this.success = false;
	      this.error = false;
	      this.errMsgVal = ''
	      this.sucMsgVal = ''
	      this.addFormError  = false;
	      this.addErrMsgVal = '';
	    }.bind(this),10000)
	}

/* Delete Spot by Id */
	async delete(uid, index) {
	    this.loader = true;
	    if(confirm('Do you want to continue?')) {
	       if(await this._userService.delete(uid)) {
	            this.users.splice(index, 1);
	            this.loader = false;
	            this.success = true;
	            this.sucMsgVal = 'This User has been deleted successfully.';
	            if(this.users.length === 0) {
	              jQuery('table.userdata tbody').append('<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty">No Record Found</td></tr>')
	            }
	        } else {
	           this.loader = false;
	           this.error  = true;
	           this.errMsgVal = 'Some error occurred.';
	        }
	    } else {
	      this.loader = false;
	    }
	    this.hideMsg() 
	}
	
	
	/* change plan user by Id */
	async changePayPlan(uid, index, userType) {
		console.log(userType);
	    this.loader = true;
	    if(confirm('please confirm if you would like to change to update user plan?')) {
	       if(await this._userService.changePayPlan(uid, userType)) {
	            // this.users[index].userType=userType;
				console.log('sanjeet');
	            this.loader = false;
	            this.success = true;
	            this.sucMsgVal = 'This User plan changed successfully to '+userType+'.';
	            if(this.users.length === 0) {
	              jQuery('table.userdata tbody').append('<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty">No Record Found</td></tr>')
	            }
	        } else {
	           this.loader = false;
	           this.error  = true;
	           this.errMsgVal = 'Some error occurred.';
	        }
	    } else {
	      this.loader = false;
	    }
	    this.hideMsg() 
	}
}

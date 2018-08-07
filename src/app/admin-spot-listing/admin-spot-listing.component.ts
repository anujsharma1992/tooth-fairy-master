import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../app-settings';
import { SpotService } from '../services/spot.service';
declare var jQuery:any;

@Component({
  selector: 'app-admin-spot-listing',
  templateUrl: './admin-spot-listing.component.html',
  styleUrls: ['./admin-spot-listing.component.css'],
  providers: [SpotService]
})
export class AdminSpotListingComponent implements OnInit {
   public spots = [];
   /* Boolean */

   public basePathimage: string;
   public loader: boolean;
   public error: boolean = false;
   public success: boolean = false;
   /* String */
   public title = 'ToothFairy: Admin -> Spots';
   public sucMsgVal : string;
   public errMsgVal : string;
   constructor(private _router: Router, private _spotService: SpotService) { // all Dependency should be injected here before use
   
   }

    ngOnInit() {
        this.loader = true;
        // this.loader = false;
		this.basePathimage = `${AppSettings.STATIC_PATH}`;
    	this._spotService.fetchAllSpots()
		    .subscribe(data => {
       		this.loader = false;
		  	this.spots = data.result;
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

   	async updateSpotStatus(spotId, status, index) {
		
	    this.loader = true;
	if(confirm('Do you want to continue?')) {
		try {
	       status = status == 0 ? 1 : 0;
	       var result = await this._spotService.updateSpotStatus(spotId, status);
	       this.spots[index]['active'] = status;
	       this.sucMsgVal = 'This Dentist status has been updated successfully.';
	       this.loader = false;
	       this.success = true;
	     } 
	     catch(e) {
	       this.errMsgVal = e;
	       this.loader = false;
	       console.log(e);
	       return false;
	     }
	}else{
		   this.loader = false;
	}	

	this.hideMsg()
	
	
	}

async verifySpotStatus(spotId, status, index) {

	    this.loader = true;
		if(confirm('Do you want to continue?')) {
	     try {
	       status = status == 0 ? 1 : 0;
			console.log(status);
	       var result = await this._spotService.verifySpotStatus(spotId, status);
	       this.spots[index]['verify'] = status;
		   this.spots[index]['doc_verified'] = status;
	       this.sucMsgVal = 'This Dentist status has been updated successfully.';
	       this.loader = false;
	       this.success = true;
	     } 
	     catch(e) {
	       this.errMsgVal = e;
	       this.loader = false;
	       console.log(e);
	       return false;
	     }
		}else{
			this.loader = false;
		}
		 
		 
	     this.hideMsg()
	}

	/* Delete Spot by Id */
	async delete(spotId, index) {
	    this.loader = true;
	    if(confirm('Do you want to continue?')) {
	       if(await this._spotService.delete(spotId)) {
	            this.spots.splice(index, 1);
	            this.loader = false;
	            this.success = true;
	            this.sucMsgVal = 'This dentist has been deleted successfully.';
	            if(this.spots.length === 0) {
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

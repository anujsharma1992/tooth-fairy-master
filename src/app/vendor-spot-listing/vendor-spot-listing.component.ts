import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotService } from '../services/spot.service';
declare var jQuery:any;

@Component({
  selector: 'app-vendor-spot-listing',
  templateUrl: './vendor-spot-listing.component.html',
  styleUrls: ['./vendor-spot-listing.component.css'],
  providers: [SpotService]
})
export class VendorSpotListingComponent implements OnInit {
   public spots = [];
   /* Boolean */
   public loader: boolean;
   public error: boolean = false;
   public success: boolean = false;
   /* String */
   public title = 'ToothFairy:Spots';
   public sucMsgVal : string;
   public errMsgVal : string;
   public vendorId : string = localStorage.getItem('vendor') || '';
   
  	constructor(private _router: Router, private _spotService: SpotService) { // all Dependency should be injected here before use
  	}

    ngOnInit() {
        this.loader = true;
    	this._spotService.fetchSpots(this.vendorId)
		    .subscribe(data => {
       		this.loader = false;
		  	this.spots = data.data;
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
    /* hide all messages */
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
	async delete(spotId, index) {
	    this.loader = true;
	    if(confirm('Do you want to continue?')) {
	       if(await this._spotService.delete(spotId)) {
	             // update users model 
	            this.spots.splice(index, 1);
	            this.loader = false;
	            this.success = true;
	            this.sucMsgVal = 'This spot has been deleted successfully.';
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

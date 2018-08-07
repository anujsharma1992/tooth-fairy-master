import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
declare var jQuery:any;

@Component({
  selector: 'app-vendor-bookings',
  templateUrl: './vendor-bookings.component.html',
  styleUrls: ['./vendor-bookings.component.css'],
  providers: [BookingService]
})
export class VendorBookingsComponent implements OnInit {
    public bookings = [];
    public loaderCheck = false;
    /* Boolean */
    public loader: boolean;
    public error: boolean = false;
    public success: boolean = false;
    /* String */
    public title = 'ToothFairy:Bookings';
    public sucMsgVal : string;
    public errMsgVal : string;
    public vendorId : string = localStorage.getItem('vendor');
    
    constructor(private _router: Router, private _bookingService: BookingService) { // all Dependency should be injected here before use
	}
	
    ngOnInit() {
        this.loader = true;
    	this._bookingService.fetchBookings(this.vendorId, '')
		    .subscribe(data => {
       		this.loader = false;
		  	this.bookings = data.data;
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

    search(bookingId) {
    	bookingId = bookingId.trim();
    	this.loaderCheck = true;
    	var t = setInterval(() => {
    		if(this.loaderCheck) {
    			this.loader = true;
    		}
    	},200);
    	this._bookingService.fetchBookings(this.vendorId, bookingId)
		    .subscribe(data => {
		    this.loaderCheck = false;
		    clearInterval(t);
		    this.loader = false;
			this.bookings = [];
		  	this.bookings = data.data;
		});	
    }
}

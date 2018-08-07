import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { AppSettings } from '../app-settings';
declare var jQuery:any;

@Component({
  selector: 'app-admin-videogallery',
  templateUrl: './admin-videogallery.component.html',
  styleUrls: ['./admin-videogallery.component.css'],
  providers: [BookingService]
})
export class AdminVideoGalleryComponent implements OnInit {
    public videos = [];
    public loaderCheck = false;
    /* Boolean */
    public loader: boolean;
    public error: boolean = false;
    public success: boolean = false;
	public basePathimage:string = `${AppSettings.STATIC_PATH}`;
    /* String */
    public title = 'ToothFairy: Video Gallery';
    public sucMsgVal : string;
    public errMsgVal : string;
    public vendorId : string = localStorage.getItem('vendor');
    
    constructor(private _router: Router, private _bookingService: BookingService) { // all Dependency should be injected here before use
	}
	
    ngOnInit() {
        this.loader = true;
    	this._bookingService.fetchvideos()
		    .subscribe(data => {
       		this.loader = false;
		  	this.videos = data.result;
			console.log(this.videos);
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
	myFunction(){
		console.log(jQuery(this).children().value)
	  var copyText = jQuery(this).children().value;
	  copyText.select();
	  document.execCommand("Copy");
	  alert("Copied the text: " + copyText.value);
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
			this.videos = [];
		  	this.videos = data.data;
		});	
    }
}

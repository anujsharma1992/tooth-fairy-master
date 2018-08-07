import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-vendor-booking-details',
  templateUrl: './vendor-booking-details.component.html',
  styleUrls: ['./vendor-booking-details.component.css'],
  providers: [BookingService]
})
export class VendorBookingDetailsComponent implements OnInit {
  public bookingDetails = {};
  public loader: boolean;
  public ROOT_PATH = AppSettings.ROOT_PATH;
  public title = 'ToothFairy:Booking-Details';
  public payerId = '';
  public err = '';
  
  constructor(private _bookingService: BookingService, private _router: Router, private route: ActivatedRoute) { // all Dependency should be injected here before use
  }

  ngOnInit() {
    // this.bookingDetails  = {name: 'alok', price: 100, desc: 'simple description', timestamp: new Date(), event_start: new Date(), event_end: new Date(), venue: 'noida'};
  	this.loader = true;
  	this.route.params.subscribe(
        params => {
        	var bookingId = params['id'];
          console.log('bookingId', bookingId);
			this._bookingService.getDetails(bookingId)
			  .subscribe(data => {
			  	this.loader = false;
		    	this.bookingDetails = data.data;
        });
		});
  }

  payNow() {
    if(typeof this.payerId != 'undefined' && this.payerId.trim() != '') {
      this._router.navigate(['bookings','checkout', this.bookingDetails['_id'], this.payerId]);
    } else {
      this.err = 'Please select a payer to continue.';
    }
    
  }
}

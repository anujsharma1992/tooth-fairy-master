import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-vendor-booking-checkout',
  templateUrl: './vendor-booking-checkout.component.html',
  styleUrls: ['./vendor-booking-checkout.component.css'],
  providers: [BookingService]
})
export class VendorBookingCheckoutComponent implements OnInit {
  public payerDetails = {};
  public loader: boolean;
  public ROOT_PATH = AppSettings.ROOT_PATH;
  public title = 'ToothFairy:Booking-Checkout';
  public payerId = '';
  public amount_err = '';
  public bookingId: string;
  public userId: string;
  public errorMsg: string;
  public sucMsg: string;

  constructor(private _bookingService: BookingService, private _router: Router, private route: ActivatedRoute) { // all Dependency should be injected here before use
  }

  ngOnInit() {
	this.loader = true;
  	this.route.params.subscribe(
        params => {
          if(params['bookingId'] == '' || params['userId'] == '') {
            this._router.navigate(['bookings']);
          } 
          this.bookingId = params['bookingId'];
          this.userId = params['userId'];
          console.log('bookingId', this.bookingId);
			this._bookingService.getUserDetails(this.userId)
			  .subscribe(data => {
			  	console.log(data);
			  	this.loader = false;
		    	this.payerDetails = data.data;
        	});
		});
  }

    async payNow(amt) {
    	if(amt.trim() === '') {
    		this.amount_err = 'Please enter the amount';
    		return false;
    	}
    	this.amount_err = '';
	    this.loader = true;
        try {
		  var obj = {
		  	amount: amt,
		  	booking_id: this.bookingId,
		  	payer_id: this.userId
          }
          var res = await this._bookingService.payNow(obj);
          if(res.status === 200) {
          	this.sucMsg = 'Payment successfull';
          }
          setTimeout(() => {
          	this._router.navigate(['bookings','details', this.bookingId]);
          }, 1000);
          this.loader = false;  
        } 
        catch(e) {
          // this.errorMsg = e.statusText;
          this.errorMsg = 'Internal Server Error!!!';
          this.loader = false;  
          return;
        }
        // this.loader = false;
	}

}

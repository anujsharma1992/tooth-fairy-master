import { Component, OnInit } from '@angular/core';
import { Spot } from '../services/auth.service'
import { SpotService } from '../services/spot.service'
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-vendor-create-spot',
  templateUrl: './vendor-create-spot.component.html',
  styleUrls: ['./vendor-create-spot.component.css'],
  providers: [SpotService]
})
export class VendorCreateSpotComponent implements OnInit {
  public title = 'ToothFairy:Create Spot'
	public errorMsg: string = '';
	public loader: boolean;
	public sucMsgVal: boolean = false;
	public sucMsg: string = '';
  /* Advance Details Fields */
	public currentVendorDetails : any = JSON.parse(localStorage.getItem('vendor_details'));
	public spot = new Spot('', '', '', '','','','','','', '', '', '', '');
	public spots = [];
	public cats = [];
 	constructor(private _router: Router, private _spotService: SpotService) {
      // console.log('Vendor Profile page');
  }

  /* load all users on ngOnit */
  	ngOnInit() {
      jQuery('.timepicker').timepicker({
        controlType: 'select',
        timeFormat: 'hh:mm tt',
        oneLine: true
      });
      jQuery('.start_date').datepicker({
            minDate: 0,
            dateFormat: 'mm/dd/yy',
            onSelect: function(dateStr) {     
                  var date = jQuery(this).datepicker('getDate');
                  if (date) {
                        date.setDate(date.getDate());
                  }
                  jQuery('.end_date').datepicker('option', 'minDate', date);
              }
        });
        jQuery('.end_date').datepicker({
              minDate: 0,
              dateFormat: 'mm/dd/yy',
              onSelect: function (selectedDate) {
                    var date = jQuery(this).datepicker('getDate');
                    if (date) {
                          date.setDate(date.getDate());
                    }
                    jQuery('.start_date').datepicker('option', 'maxDate', date || 0);
              }
        });
      this._spotService.fetchCats()
		    .subscribe(data => {
		    	this.cats = data.data;
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
      }.bind(this),5000)
    }
  
  	/* Update business owners profile */
    async createSpot() {
        // var startDate = (<HTMLInputElement>document.querySelector('.start_date'));
        // var endDate = (<HTMLInputElement>document.querySelector('.end_date'));
        // var fromHours = (<HTMLInputElement>document.querySelector('.from_hours'));
        // var toHours = (<HTMLInputElement>document.querySelector('.to_hours'));
        // var venueHtml = (<HTMLInputElement>document.querySelector('.venue'));
        // this.spot['venue'] = venueHtml.value;
        // this.spot.from_hours = fromHours.value;
        // this.spot.to_hours = toHours.value;
        // this.spot.event_start = startDate.value;
        // this.spot.event_end = endDate.value;
        this.loader = true;
        var inputValue = (<HTMLInputElement>document.getElementById('file'));
        var fileList: FileList = inputValue.files;
        try {
          var userId = localStorage.getItem('vendor');
          var res = await this._spotService.createSpot(fileList, this.spot, userId, 1);
        } 
        catch(e) {
          // this.errorMsg = e.statusText;
          this.errorMsg = 'Internal Server Error!!!';
          this.loader = false;  
          return;
        }
        
        if(res.status !== 201) {
            this.errorMsg = 'Internal Server Error!!!';
        } else {
            this.sucMsgVal = true;
            this.sucMsg = 'A new spot has been created successfully';
            this.errorMsg = '';
            window.scrollTo(0, 0);
            setTimeout(() => {
              this._router.navigate(['spots']);  
            }, 1700);
        }
        this.hideMsg();
        this.loader = false;
    }
}

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { Spot } from '../services/auth.service'
import { SpotService } from '../services/spot.service'
import { AppSettings } from '../app-settings';
declare var jQuery:any;
@Component({
  selector: 'app-vendor-edit-spot',
  templateUrl: './vendor-edit-spot.component.html',
  styleUrls: ['./vendor-edit-spot.component.css'],
  providers: [SpotService]
})
export class VendorEditSpotComponent implements OnInit {
	public spotData = {};
  public loader: boolean;
  public ROOT_PATH = AppSettings.ROOT_PATH;
  public spot = new Spot('', '', '', '','','','','','', '', '', '', '');
  public cats = [];
  public errorMsg: string = '';
	public sucMsgVal: boolean = false;
	public sucMsg: string = '';
	public removeImagesArr = [];
	public hideImageDiv = true;
  public title = 'ToothFairy:Edit-Spot';
  /* Advance Details Fields */
	public currentVendorDetails : any = JSON.parse(localStorage.getItem('vendor_details'));
	
	constructor(private _spotService: SpotService, private _router: Router, private route: ActivatedRoute) { // all Dependency should be injected here before use
  }
	
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
      /* Fetch all available categories created  by admin */
      // this._spotService.fetchCats()
	    // .subscribe(data => {
	    	// this.cats = data.data;
	    // });
	  // /* End Fetch all available categories created  by admin */
	  	// this.loader = true;
	  	// this.route.params.subscribe(
	        // params => {
	        	// var spotId = params['id'];
				// this._spotService.getSpotDetails(spotId)
				// .subscribe(data => {
					// this.loader = false;
			    	// this.spot = data.data;
			    	// if(this.spot.event_start != '')
			    	// this.spot.event_start = this.getDateDDMMYYYY(this.spot.event_start);
			    	// if(this.spot.event_end != '')
			    	// this.spot.event_end = this.getDateDDMMYYYY(this.spot.event_end);
			    	// console.log(this.spot);
	            // });
			// });
	}

	getDateDDMMYYYY(date) {
	 	var today = new Date(date);
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		var m =''+mm, d =''+ dd;
		if(dd<10){
		    d='0'+dd;
		} 
		if(mm<10){
		   m='0'+mm;
		} 
		return  m+ '/'+ d + '/'+yyyy;
	}

	async updateSpot() {
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
        // this.loader = true;
        // var inputValue = (<HTMLInputElement>document.getElementById('file'));
        // var fileList: FileList = inputValue.files;
        // try {
          // var res = await this._spotService.updateSpot(fileList, this.spot, this.removeImagesArr);      
        // } 
        // catch(e) {
        	// console.log(e);
          // // this.errorMsg = e.statusText;
          // this.errorMsg = 'Internal Server Error!!!';
          // this.loader = false;  
          // return;
        // }
        // if(res.status !== 200) {
            // this.errorMsg = 'Internal Server Error!!!';
        // } else {
            // this.sucMsgVal = true;
            // this.sucMsg = 'Spot has been updated successfully';
            // this.errorMsg = '';
            // window.scrollTo(0, 0);
            // setTimeout(() => {
              // this._router.navigate(['spots']);  
            // }, 1700);
            
        // }
        this.hideMsg();
        this.loader = false;
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

    removeImages(image,index) {
		  this.removeImagesArr.push(image);
    	this.spot['images'].splice(index, 1);
    }
}

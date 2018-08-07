import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Spot } from '../services/auth.service';
import { SpotService } from '../services/spot.service';
import { AppSettings } from '../app-settings';
declare var jQuery:any;
@Component({
  selector: 'app-admin-edit-spot',
  templateUrl: './admin-edit-spot.component.html',
  styleUrls: ['./admin-edit-spot.component.css'],
  providers: [SpotService]
})
export class AdminEditSpotComponent implements OnInit {
	public spotData = {};
	public loader: boolean;
	public ROOT_PATH = AppSettings.ROOT_PATH;
	public baseImagePath = AppSettings.STATIC_PATH;
	public spot = new Spot('', '', '', '','','','','','', '', '', '', '');
	public cats = [];
	public errorMsg: string = '';
	public sucMsgVal: boolean = false;
	public sucMsg: string = '';
	public removeImagesArr = [];
	public hideImageDiv = true;
	
	constructor(private _spotService: SpotService, private _router: Router, private route: ActivatedRoute) { // all Dependency should be injected here before use
  	}

	ngOnInit() {
		// debugger;
		 // jQuery('.timepicker').timepicker({
	        // controlType: 'select',
	        // timeFormat: 'hh:mm tt',
	        // oneLine: true
	      // });
		 // jQuery('.start_date').datepicker({
            // minDate: 0,
            // dateFormat: 'mm/dd/yy',
            // onSelect: function(dateStr) {     
                  // var date = jQuery(this).datepicker('getDate');
                  // if (date) {
                        // date.setDate(date.getDate());
                  // }
                  // jQuery('.end_date').datepicker('option', 'minDate', date);
	            // }
	      // });
	      jQuery('.dateOfBirth').datepicker({
	            minDate: 0,
	            dateFormat: 'mm-dd-yy',
	            onSelect: function (selectedDate) {
	                  var date = jQuery(this).datepicker('getDate');
	                  if (date) {
	                        date.setDate(date.getDate());
	                  }
	                  // jQuery('.dateOfBirth').datepicker('option', 'maxDate', date || 0);
	            }
	      });
      // /* Fetch all available categories created  by admin */
      // this._spotService.fetchCats()
	    // .subscribe(data => {
	    	// this.cats = data.data;
	    // });
	  // /* End Fetch all available categories created  by admin */
	  	this.loader = true;
	  	this.route.params.subscribe(
	        params => {
	        	var spotId = params['id'];
				this._spotService.getSpotDetails(spotId)
				.subscribe(data => {
					this.loader = false;
			    	this.spot = data.result;
			    	if(this.spot.dateOfBirth != '')
			    	this.spot.dateOfBirth = this.getDateDDMMYYYY(this.spot.dateOfBirth);
			    	// if(this.spot.event_end != '')
			    	// this.spot.event_end = this.getDateDDMMYYYY(this.spot.event_end);
			    	console.log(this.spot);
	            });
			});
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
		return  m+ '-'+ d + '-'+yyyy;
	}

	async updateSpot() {
        var firstName = (<HTMLInputElement>document.querySelector('.firstName'));
        var lastName = (<HTMLInputElement>document.querySelector('.lastName'));
        var dateOfBirth = (<HTMLInputElement>document.querySelector('.dateOfBirth'));
        var email = (<HTMLInputElement>document.querySelector('.email'));
        var regNumber = (<HTMLInputElement>document.querySelector('.regNumber'));
        var gender = (<HTMLInputElement>document.querySelector('.gender'));
        // this.spot['uid'] = params['id'];
        this.spot['regNumber'] = regNumber.value;
        this.spot.email = email.value;
        this.spot.firstName = firstName.value;
		this.spot.lastName = lastName.value;
		this.spot.gender = gender.value;
        this.spot.dateOfBirth = dateOfBirth.value.split('/').join('-');
		// alert(this.spot.dateOfBirth)
        this.loader = true;
		var inputValue = (<HTMLInputElement>document.getElementById('file'));
        var fileList: FileList = inputValue.files;
        try {
          var res = await this._spotService.updateSpot(fileList, this.spot, this.removeImagesArr);      
        } 
        catch(e) {
        	console.log(e);
          // this.errorMsg = e.statusText;
          this.errorMsg = 'Internal Server Error!!!';
          this.loader = false;  
          return;
        }
        if(res.code !== 200) {
            this.errorMsg = 'Internal Server Error!!!';
        } else {
            this.sucMsgVal = true;
            this.sucMsg = 'Spot has been updated successfully';
            this.errorMsg = '';
            this._router.navigate(['/admin/dentist']);
        }
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
	
	
	readURL(input) {
		// console.log(input.target.files[0]);
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e:any) {
				console.log(e);
                // jQuery('#blah')
                    // .attr('src', e.target.result)
                    // .width(150)
                    // .height(200);
            };

            // reader.readAsDataURL(input.files[0]);
        }
    }

    removeImages(image,index) {
		this.removeImagesArr.push(image);
    	this.spot['images'].splice(index, 1);
    }

}

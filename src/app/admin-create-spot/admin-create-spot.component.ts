import { Component, OnInit } from '@angular/core';
import { Spot } from '../services/auth.service'
import { SpotService } from '../services/spot.service'
import { Router } from '@angular/router';
declare var jQuery:any;

@Component({
  selector: 'app-admin-create-spot',
  templateUrl: './admin-create-spot.component.html',
  styleUrls: ['./admin-create-spot.component.css'],
  providers: [SpotService]
})

export class AdminCreateSpotComponent implements OnInit {
    public title = 'ToothFairy: Create Dentist'
	public errorMsg: string = '';
	public loader: boolean;
	public sucMsgVal: boolean = false;
	public sucMsg: string = '';
    /* Advance Details Fields */
	public spot = new Spot('', '', '', '', '', '' , '', '', '', '', '', '', '');
	public spots = [];
	public cats = [];
  	constructor(private _router: Router, private _spotService: SpotService) {
      console.log('Admin : Create Dentist');
  	}	

    ngOnInit() {
		
      // jQuery('.timepicker').timepicker({
        // controlType: 'select',
        // timeFormat: 'hh:mm tt',
        // oneLine: true
      // });
		  jQuery('.dateOfBirth').datepicker({
            maxDate: 0,
            dateFormat: 'mm-dd-yy',
            onSelect: function(dateStr) {     
                  var date = jQuery(this).datepicker('getDate');
                  if (date) {
                        date.setDate(date.getDate());
                  }
                  jQuery('.end_date').datepicker('option', 'maxDate', date);
              }
        });
        // jQuery('.end_date').datepicker({
              // minDate: 0,
              // dateFormat: 'mm/dd/yy',
              // onSelect: function (selectedDate) {
                    // var date = jQuery(this).datepicker('getDate');
                    // if (date) {
                          // date.setDate(date.getDate());
                    // }
                    // jQuery('.dateOfBirth').datepicker('option', 'maxDate', date || 0);
              // }
        // });
        // this._spotService.fetchCats()
		    // .subscribe(data => {
		    	// this.cats = data.data;
		    // });
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
        var firstName = (<HTMLInputElement>document.querySelector('.firstName'));
        var lastName = (<HTMLInputElement>document.querySelector('.lastName'));
        var dateOfBirth = (<HTMLInputElement>document.querySelector('.dateOfBirth'));
        // var timeOfBirth = (<HTMLInputElement>document.querySelector('.timeOfBirth'));
        var regNumber = (<HTMLInputElement>document.querySelector('.regNumber'));
        var email = (<HTMLInputElement>document.querySelector('.email'));
		

        this.spot.firstName = firstName.value;
        this.spot.lastName = lastName.value;
        this.spot.dateOfBirth = dateOfBirth.value.split('/').join('-');
        this.spot.regNumber = regNumber.value;
        
        // this.spot.timeOfBirth = timeOfBirth.value;
        this.spot.email = email.value;
        this.loader = true;
        var inputValue = (<HTMLInputElement>document.getElementById('file'));
        var fileList: FileList = inputValue.files;
        try { 
		  var userId = localStorage.getItem('admin');
          var res = await this._spotService.createSpot(fileList, this.spot, userId, 2);      
		  console.log(res);
        } 
        catch(e) {
          this.errorMsg = 'Internal Server Error!!!';
          this.loader = false;  
          return;
        }
		
        if(res.code !== 201) {
            this.errorMsg = res.message;
        } else {
            this.sucMsgVal = true;
            this.sucMsg = 'A new dentist has been created successfully';
            this.errorMsg = '';
            // this._router.navigate(['admin/dentist']);
        }
        this.hideMsg();
        this.loader = false;
    }

}

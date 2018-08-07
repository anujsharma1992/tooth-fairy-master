import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { } from 'googlemaps';
import { AppSettings } from '../app-settings';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var jQuery:any;
declare var google:any;
declare var infowindowContent:any;

@Component({
  selector: 'app-vendor-appointment',
  templateUrl: './vendor-appointment.component.html',
  styleUrls: ['./vendor-appointment.component.css'],
  providers: [UserService]
})
export class VendorAppointment implements OnInit {
    public videos = [];
    public loaderCheck = false;
    public loader: boolean;
	public basePathimage:string = `${AppSettings.STATIC_PATH}`;
    /* String */
    public title = 'ToothFairy: Appointments';
    public patientNotes:string='';  
    public nearByClinics:any;  
    public vendorId : string = localStorage.getItem('vendor');
    constructor(private _router: Router, private _userService: UserService) {}
	
    ngOnInit() {
		 // this._userService.setMyVideoSession(5, '','','','');
		this.loader=true;
		this._userService.getPrevAppointments(JSON.parse(localStorage.getItem('vendor')), null).subscribe(data => {
			this.nearByClinics = data.result;
			if(data.code==400){
				alert(data.message);
			}
			else{
				this.patientNotes = data.result[0].notes;
			}
			this.loader=false;
		});	
    }
	
	myFunction(){
	  var copyText = jQuery(this).children().value;
	  copyText.select();
	  document.execCommand("Copy");
	  alert("Copied the text: " + copyText.value);
	}
	
}

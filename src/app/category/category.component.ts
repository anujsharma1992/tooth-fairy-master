import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { } from 'googlemaps';
import { AppSettings } from '../app-settings';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { BookingService } from '../services/booking.service'
import { CategoriesService } from '../services/categories.service'
declare var jQuery:any;
declare var google:any;
declare var infowindowContent:any;

declare var jQuery:any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoriesService, BookingService]
})
export class CategoryComponent implements OnInit {
    public videos = [];
    public loaderCheck = false;
    public loader: boolean;
	public basePathimage:string = `${AppSettings.STATIC_PATH}`;
    /* String */
    public title = 'ToothFairy: Appointments';
    public patientNotes:string='';  
    public nearByClinics:any;  
    public searchText:string='';  
    public vendorId : string = localStorage.getItem('vendor');
	public limit:number=10;
	public count:number=0;
	public offset:number=0;
	// public limit:number=10;
    constructor(private _router: Router, private _bookingService: BookingService) {}
	
    ngOnInit() {
		this.loader=true;
		this._bookingService.adminfetchBookings(this.limit, this.offset, this.searchText).subscribe(data => {
			this.nearByClinics = data.result;
			console.log(data);
			if(data.code==400){
				alert(data.message);
			}
			else{
				this.patientNotes = data.result[0].notes;
				this.count = data.count;
			}
			this.loader=false;
		});	
    }
	onPageChange(offset){
		console.log(offset, 'sanjeet')
	  this.offset = offset;
	  this._bookingService.adminfetchBookings(this.limit, offset, this.searchText).subscribe(data => {
			this.nearByClinics = data.result;
			if(data.code==400){
				alert(data.message);
			}
			else{
				this.patientNotes = data.result[0].notes;
				this.count = data.count;
			}
			this.loader=false;
		});	
	}
	keyupfunction(){
		this._bookingService.adminfetchBookings(this.limit, 0, this.searchText).subscribe(data => {
			this.nearByClinics = data.result;
			if(data.code==400){
				alert(data.message);
			}
			else{
				this.patientNotes = data.result[0].notes;
				this.count = data.count;
			}
			this.loader=false;
		});
	}
	myFunction(){
		setTimeout(()=>{
		  var copyText = jQuery(this).children().value;
		  copyText.select();
		  document.execCommand("Copy");
		  alert("Copied the text: " + copyText.value);
		},1000);
	}	
}

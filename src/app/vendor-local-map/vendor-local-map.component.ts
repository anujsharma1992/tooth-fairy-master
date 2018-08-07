import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
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
  selector: 'app-vendor-local-map',
  templateUrl: './vendor-local-map.component.html',
  styleUrls: ['./vendor-local-map.component.css'],
  providers: [UserService]
})
export class VendorLocalMapComponent implements OnInit {
    public videos = [];
    public loaderCheck = false;
    public loader: boolean;
    public Curlocation: any={lat:0, lng:0};
    public error: boolean = false;
    public success: boolean = false;
	
	public basePathimage:string = `${AppSettings.STATIC_PATH}`;
    /* String */
    public title = 'ToothFairy: Dentist Map';
    
    public nearByClinics:any;
	
	public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;

	@ViewChild("search")
	public searchElementRef: ElementRef;

  
    public searchText:string = '';
    public sucMsgVal : string;
    public errMsgVal : string;
    public vendorId : string = localStorage.getItem('vendor');

    constructor(private _router: Router, private _userService: UserService, private mapsAPILoader:MapsAPILoader, private ngZone: NgZone) {
	}
	
    ngOnInit() {
		this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
	
	 this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
			this._userService.fetchMapAreas({lat:this.latitude, lng:this.longitude, radius:4500}).subscribe(data => {
				console.log(data.data.results);
				this.nearByClinics = data.data.results;
			});	
        });
      });
    });
 	
    }
	
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
		this._userService.fetchMapAreas({lat:this.latitude, lng:this.longitude, radius:15000}).subscribe(data => {
			console.log(data.data.results);
			this.nearByClinics = data.data.results;
		});
      });
    }
  }
	myFunction(){
		console.log(jQuery(this).children().value)
	  var copyText = jQuery(this).children().value;
	  copyText.select();
	  document.execCommand("Copy");
	  alert("Copied the text: " + copyText.value);
	}
	
	
}

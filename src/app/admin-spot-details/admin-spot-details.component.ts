import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotService } from '../services/spot.service'
import { AppSettings } from '../app-settings';
@Component({
  selector: 'app-admin-spot-details',
  templateUrl: './admin-spot-details.component.html',
  styleUrls: ['./admin-spot-details.component.css'],
  providers: [SpotService]
})
export class AdminSpotDetailsComponent implements OnInit {
  public spotData = {};
  public loader: boolean;
  public ROOT_PATH = AppSettings.ROOT_PATH;
	public baseImagePath = AppSettings.STATIC_PATH;

  constructor(private _spotService: SpotService, private _router: Router, private route: ActivatedRoute) { // all Dependency should be injected here before use
  }
  
    ngOnInit() {
	  	this.loader = true;
	  	this.route.params.subscribe(
        params => {
        	var spotId = params['id'];
			this._spotService.getSpotDetails(spotId)
			.subscribe(data => {
				this.loader = false;
		    	this.spotData = data.result;
				console.log(this.spotData)
            });
		});
	}

}

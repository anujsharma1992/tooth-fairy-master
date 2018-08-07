import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service'
import { AppSettings } from '../app-settings';
@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css'],
  providers: [UserService]
})
export class AdminUserDetailsComponent implements OnInit {

  public spotData = {};
  public loader: boolean;
  public ROOT_PATH = AppSettings.ROOT_PATH;
  public basePathimage = AppSettings.STATIC_PATH;


  constructor(private _userService: UserService, private _router: Router, private route: ActivatedRoute) { // all Dependency should be injected here before use
  }
  
    ngOnInit() {
	  	this.loader = true;
	  	this.route.params.subscribe(
        params => {
        	var spotId = params['id'];
			this._userService.getSpotDetails(spotId)
			.subscribe(data => {
				this.loader = false;
		    	this.spotData = data.result;
				console.log(this.spotData)
            });
		});
	}

}

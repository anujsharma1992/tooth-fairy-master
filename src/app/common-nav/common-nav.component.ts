import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router , ActivatedRoute, Params} from '@angular/router';
import { AppSettings } from '../app-settings';
import { Socket } from 'ng-socket-io';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-common-nav',
  templateUrl: './common-nav.component.html',
  styleUrls: ['./common-nav.component.css']
})
export class CommonNavComponent implements OnInit {
  public userFullName: string = 'guest';
  public profilePic: string;
  public isPlanActive: boolean;
  public isBooked: boolean;
  public baseImagePath = AppSettings.STATIC_PATH;
  public incoming_call:boolean = false;
  public usersDetails:any;
  public bookingDetails:any;
  public setIntervalKill:any;
  public setAutoDecline:any;
  public setMargin:any=0;
  constructor(private _userService: UserService, private _authService: AuthService,private socket: Socket, private _router: Router , private activatedRoute:ActivatedRoute) { 
	
  }
  
  ngOnInit() {
	    // this._userService.isPlanActive.subscribe(value => {	  
		  // this.isPlanActive = value?true:false;
		  // alert(this.isPlanActive);
		// });
		// jQuery(".switch").parent().parent().hide();
		this.onlineOfflineStateCheck();
	  	jQuery("body").addClass("skin-blue sidebar-mini");
		jQuery('.dropdown').on('show.bs.dropdown', function(e){
		  jQuery(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
		});
		jQuery('.dropdown').on('hide.bs.dropdown', function(e){
		  jQuery(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
		});
		this.usersDetails=JSON.parse(localStorage.getItem('vendor'));
		// alert(this.usersDetails.verify);
		
		this.isPlanActive = this.usersDetails.verify;
		
		
		this.isBooked = this.usersDetails.booked;
		this.userFullName = localStorage.getItem('vendor') ?  this.usersDetails.firstName : '';
		this.profilePic = localStorage.getItem('vendor') ? this.usersDetails.image : '';
		this.socket.emit('savesocket', {uid:this.usersDetails.uid});
		// this.socket.emit('payment_received', {uid:this.usersDetails.uid});
		// this.socket.emit('save_socket_user', {uid:'OA4J2AZ8VPZ34BEIWF1YL528J'});
		// this.socket.emit('search_dentist', {uid:'OA4J2AZ8VPZ34BEIWF1YL528J', booking_id:1});
		this.socket.on('connect', (data) => {
			//alert(data);
		});
		this.socket.on('disconnect', (data) => {
			console.log("disconnected from server error is "+data);
		});
		this.socket.on('appointment_request', (data) => {
			this.callringing();
			this.incoming_call=true;
			this.bookingDetails=data;
			// console.log(this.bookingDetails);
			var xtimer=0;
			this.setIntervalKill = setInterval(()=>{
				xtimer++;
				if(xtimer>=300){
					this.socket.emit('session_timeout', {"message":"session timeout.",socket_id:this.bookingDetails.socket_id});
					clearTimeout(this.setIntervalKill);
					this.callEndedWithoutPay();
				}
			}, 1000)
			jQuery('#chatAudio')[0].play();
			// this.setAutoDecline = setTimeout(()=>{
				// this.declined_call();
				// clearTimeout(this.setAutoDecline);
				// alert('You have missed/declined a call');
			// },10000);
		});
		
		this.socket.on('user_payment_received', (data) => {
			console.log(data.token);
			console.log(data.sessionId);
			console.log(data);
			clearTimeout(this.setIntervalKill);
				this.isBooked=true;
				console.log(this.bookingDetails.booking_id);
				this._router.navigate(['dashboard', {id: 2, token:data.token, sessionId:data.sessionId, uid:data.uid, booking_id:this.bookingDetails.booking_id}]);
		});
		
		this.socket.on('call_ended_by_user_to_dentist', (data) => {
				//alert('user payment received caall ');
				this.endCallNow();
		});
		// this.activatedRoute.params.subscribe((params: Params) => {
		// if(params['id']==2){
			// this.isBooked=true;
		// }
		// });
  }
  
  
  accepted_call(){
	  this.callringing();
	  clearTimeout(this.setAutoDecline);
	  this._router.navigate(['dashboard', {id: 5}]);
	  this.incoming_call=false;
	  jQuery('#chatAudio')[0].pause();
	  jQuery('#chatAudio')[0].currentTime = 0;
	  this.socket.emit('accepted_call', {uid:this.usersDetails.uid, booking_id:this.bookingDetails.booking_id, socket_id:this.bookingDetails.socket_id});
  }
  
  
  declined_call(){
	  this.callringing();
	  clearTimeout(this.setAutoDecline);
	  this.incoming_call=false;
	  jQuery('#chatAudio')[0].pause();
	  jQuery('#chatAudio')[0].currentTime = 0;
	  this.socket.emit('declined_call', {uid:this.bookingDetails.uid, did:this.usersDetails.uid, booking_id:this.bookingDetails.booking_id, socket_id:this.bookingDetails.socket_id});
  }
appointment_nav() {
	this.activatedRoute.params.subscribe((params: Params) => {
		this._router.navigate(['appointments', {id: params.id, token:params.token, sessionId:params.sessionId, uid:params.uid, booking_id:params.booking_id}]);
	});
}

dashboard_nav() {
	this.activatedRoute.params.subscribe((params: Params) => {
		this._router.navigate(['dashboard', {id: params.id, token:params.token, sessionId:params.sessionId, uid:params.uid, booking_id:params.booking_id}]);
	});
}

  async callringing(){		  
	try {
	  var res = await this._userService.callringing(JSON.parse(localStorage.getItem('vendor')));      
	} 
	catch(e) {
	  return;
	}
  }
  
   async onlineOfflineStateCheck(){
	try {
	  var res = await this._userService.onlineOfflineStateCheck(JSON.parse(localStorage.getItem('vendor')));      
	  jQuery("#checkSwitchButton").prop('checked',res.online);
	  jQuery(".switch").parent().parent().show();
	  this._userService.setLoginStatus(res.online);
	} 
	catch(e) {
	  return;
	}
  }
  
  async changeOnlineStatus(e){	  
	  if(e.target.checked){
		  if(confirm("Are you sure you want to go online")){
				try {
				  var res = await this._userService.onlineOfflineState(JSON.parse(localStorage.getItem('vendor')), 1);    
				  this._userService.setLoginStatus(true);
				} 
				catch(e) {
				  return;
				}
		  }else{
			e.target.checked=false;
			this._userService.setLoginStatus(false);
		  }
	  }else{
		  
		  if(confirm("Are you sure you want to go offline")){
			try {
			  var res = await this._userService.onlineOfflineState(JSON.parse(localStorage.getItem('vendor')), 0);
			  this._userService.setLoginStatus(false);
			} 
			catch(e) {
			  return;
			}
		  }
		  else{
			  e.target.checked=true;
			  this._userService.setLoginStatus(true);
		  }
	  }
  }
  async endCallNow(){
	  if(jQuery('.Patient-Notes .form-group textarea').val()=='' || jQuery('.patient:nth-child(2) .form-group .quantity').val()=='' || jQuery('.patient:nth-child(2) .form-group .dynoprescription').val()=='')
	  {
		  alert('please complete priscription area in the form before ending the call');
	  }else{
			//console.log($("#patientNotesShowHide").val());
		  if(!($("#patientNotesShowHide").val()=='')){
			  jQuery('.dynoprescription').each(function(){
				if(jQuery(this).val()!=''){
					jQuery(".Prescription-list ul.Prescription-li").append("<li>"+jQuery(this).val()+" ("+jQuery(this).parents('.patient').find('.quantity').val()+")</li>");
				}				
			  });
			$('#myModal').modal('show');
		  }
		  else{
			  if(confirm("Are you sure you want to end the call")){
					try {
						this.socket.emit('call_ended', {uid:this.usersDetails.uid, booking_id:this.bookingDetails.booking_id, socket_id:this.bookingDetails.socket_id});
					  var res = await this._userService.endCallNow(JSON.parse(localStorage.getItem('vendor')));
						this.isBooked=false;  			  
						jQuery("#checkSwitchButton").prop('checked',false);
						this._router.navigate(['dashboard']);
					} 
					catch(e) {
					  return;
					}
			  }
		  }
	  }
  }
  async callEndedWithoutPay(){
	  try {
		  var res = await this._userService.endCallNow(JSON.parse(localStorage.getItem('vendor')));
			this.isBooked=false;
			jQuery("#checkSwitchButton").prop('checked',false);
			this._router.navigate(['dashboard']);
		} 
		catch(e) {
		  return;
		}
  }
  
  logout() {
  	this._authService.logout(1);
  }
}

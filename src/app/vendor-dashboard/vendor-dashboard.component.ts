import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { docUploads } from '../services/user.service';
import { ChatService } from '../services/spot.service';
import { StripeService } from '../services/stripe.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AppSettings } from '../app-settings';
declare var jQuery:any;
declare var $:any;
declare var baguetteBox:any;
declare var handleError:any;
declare var TimerInterval:any;
declare var connectedStream:any;
declare var counter:any;
declare var OT:any;
@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  providers: [UserService, StripeService, ChatService],
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {
  
  public loader : boolean = false;
  public isVerifiedMsg : string;
  public baseImagePath = AppSettings.STATIC_PATH;
 
  public isVerifyVal : boolean = false;
  public handler: any;
  public errorMsg: string = '';
  public title: string = 'Toothfairy | Dashboard';
  public sucMsgVal: boolean = false;
  public docUploaded: boolean = false;
  public timeshowhide: boolean = false;
  public timeshowhide2: boolean = true;
  public docUploadedLinks: boolean = false;
  public checkWaitng: boolean = false;
  public sucMsg: string = '';
  public appoinmentSelect: string = 'today';
  public fileContent = new docUploads('','','','','','','','','','','','','','','','','','','','','');
  public simpleDocUrls = new docUploads('','','','','','','','','','','','','','','','','','','','','');
  public notificationObj: any;
  public vendorDetail: any;
  public appointmentCount: number;
  public doctorCheckList:any;
  public isUserOnline:boolean=false;
  public getPatientDetailsObj:any;
  public getPatientMedicalHistoryObj:any;
  public complaint_form:any;
  public patientNotes:string='';
  public getBookingDetailsObj:any;
  public counterStartNow:any;
  public OnlineHH:number=0;
  public OnlineMM:number=0;
  public OnlineSS:boolean=false;
  public apiKey:string = "46094752";
  public sessionId:string = "";
  public prescriptionArr:Array<any> = [];
  public notesList:any;
  public patientNotesShowHide:boolean=false;
  public token:string = "";
  public notes_text:string = "";
  public booking_id:string = "";
  constructor(private _userService: UserService, private _stripeService: StripeService,private _chatservice: ChatService,  private _router: Router, private activatedRoute:ActivatedRoute) {
			  // var counter=0;
			  this.counterStartNow = new TimerInterval(function() {
						 counter++;
						  if (counter >= 0) {
							  var date = new Date(null);
								date.setSeconds(counter);
								var result = date.toISOString().substr(11, 8);
								var arrTimer = result.split(':');
								setTimeout(()=>{
									jQuery('#remainingTime .hh_h').html(arrTimer[0]);
									jQuery('#remainingTime .mm_h').html(arrTimer[1]);
									jQuery('#remainingTime .ss_h').html(arrTimer[2]);
								
								},0);
						  }
						 }, 1000);
	  
	  this._userService.isUserOnline.subscribe(value => {
		  this.isUserOnline = value;
		  this.OnlineSS = value;
		   
			if(value){
				setTimeout(()=>{this.counterStartNow.start();},0)
			}
			else{
				setTimeout(()=>{
					this.counterStartNow.stop();},0)
			}
	  });
  }

ngOnInit(){
	console.log('variable set sanjeet ');
	 
	this.getDateWiseAppointment(this.appoinmentSelect);
			  this.activatedRoute.params.subscribe((params: Params) => {
				if(params['id']==5){
					this.timeshowhide=false;
					this.timeshowhide2=false;
					setTimeout(()=>{
						this.timeStart(5)
					},0);
				}
				else if(params['id']==2){
					this.timeshowhide=false;
					this.timeshowhide2=true;
					this.sessionId=params['sessionId'];
					this.token=params['token'];
					this.booking_id=params['booking_id'];
					this.getPatientDetails(params['uid']);
					this.getBookingDetails(params['booking_id']);
					this.getPatientMedicalHistory(params['uid']);
					this.insertNotes(params['booking_id']);
					this.getPrescription();
					setTimeout(()=>{
						if(params['start']){
							this.timeStart(0);
							this.initializeSession('connect', false);
						}else{
							this.timeStart(0);
							this.initializeSession('connect', true);
						}
					},0);
				}
				else{
					this.timeshowhide=true;
					this.timeshowhide2=false;
					this.initializeSession('disconnect', true);
				}
			  });
		  this.getCheckListForDentist();
		  
		  this.notificationObj = JSON.parse(localStorage.getItem('PushSubscribe'));
		  this.vendorDetail = JSON.parse(localStorage.getItem('vendor'));
			try {
			  var res = this._userService.subscribeUserByUid(this.vendorDetail, this.notificationObj);    
			} 
			catch(e) {
				alert("some error "+ e);
				return;
			}
	this.simplefunction(this.vendorDetail);
}
initializeSession(x, nav) {
	// if(nav){
		//if(!session){
			//session.disconnect();
		//}
		var session = OT.initSession(this.apiKey, this.sessionId);
		if(x=='connect'){  
		jQuery('#subscriber').html('');
		  // Subscribe to a newly created stream
		 
		  session.on('streamCreated', function(event) {
			var connectedStream  = event.stream;
			session.subscribe(event.stream, 'subscriber', {
			  insertMode: 'append',
			  width: '100%',
			  height: '100%'
			}, handleError);
		  });
		if(!nav){  
		  session.subscribe(connectedStream, 'subscriber', {
			  insertMode: 'append',
			  width: '100%',
			  height: '100%'
			}, handleError);
		}
		  // Create a publisher
		  var publisher = OT.initPublisher('publisher', {
			insertMode: 'append',
			width: '100%',
			height: '100%'
		  }, handleError);

		  // Connect to the session
		  session.connect(this.token, function(error) {
			// If the connection is successful, initialize a publisher and publish to the session
			if (error) {
			  handleError(error);
			} else {
				// if(nav){
					
				// }
				// else{
					session.publish(publisher, handleError);
				// }
			}
		  });
		}
		else{
		session.disconnect();
		}
	// }
}
  async simplefunction(vendorDetail){
		try { 
          var res = await this._userService.getUserDocumentsDetail(vendorDetail);
		  
		 this.docUploaded=true;
		 
		 if(res.code==200){
			 if(res.result[0].indemnity.length>10){
				 this.simpleDocUrls= res.result[0];
				this.isVerifyVal=res.result[0].doc_verified;
				 				
			  }
			}
			else{
				this.isVerifyVal=false;
				this.checkWaitng=true;
			}			
        } 
        catch(e) {
			alert("some error "+ e);
			return;
        }
	}
	
	async getDateWiseAppointment(appointment){
		// console.log(appointment);
		// debugger;
		// this.loader = true;
		this._userService.getDateWiseAppointment(JSON.parse(localStorage.getItem('vendor')), appointment)
		.subscribe(data => {
			// this.loader = false;
			this.appointmentCount = data.total;
			
			// console.log(data)
		});
	}
	
	async getCheckListForDentist(){
		this.loader = true;
		this._userService.getCheckListForDentist()
		.subscribe(data => {
			this.loader = false;
			this.doctorCheckList = data.result;
			// console.log(this.doctorCheckList);
			setTimeout(()=>{jQuery('.scroll-pane').jScrollPane()},0);
		});
	}
	
	async getPrescription(){
		await this._userService.getPrescription()
		.subscribe(data => {
			for(var i=0; i<data.result.length;i++){
				this.prescriptionArr.push(data.result[i].prescription);
			}
			jQuery( ".dynoprescription" ).autocomplete({
			  source: this.prescriptionArr
			});
			// setTimeout(()=>{
				// var tags3 = jQuery('#tagtacular_3').tagtacular({
					// entityId: 103,
					// entityTags: [],
					// systemTags: this.prescriptionArr,
					// configShowAddButton: false,
					// configShowSwitchButton: false,
					// configPlaceholderText: "&#xf002; Search",
					// configDelimiters: []
				// });
				// },10);
		});
	}

	addAnotherfield(){
		jQuery('.Patient-Prescription-inner-gap .patient:last').after('<div class="patient"><div style="padding: 0 5px;" class="col-md-6 Prescription-padding"><div class="form-group"> <input style="height: 33px;" class="form-control dynoprescription"/></div></div><div class="col-md-3 Prescription-padding" style="padding: 0;"><div style="padding:0 5px;" class="form-group"><input style="height: 33px;" class="form-control quantity"/></div></div></div>');
		
		jQuery( ".dynoprescription" ).autocomplete({
		  source: this.prescriptionArr
		});
	}
		
	async sendandgeneratepdf(){
		var prescripArr = [];
		var selectedCheckList = [];
	  jQuery('.dynoprescription').each(function(){
		if(jQuery(this).val()!=''){
			prescripArr.push(jQuery(this).val()+"|"+jQuery(this).parents('.patient').find('.quantity').val());
			jQuery(".Prescription-list ul.Prescription-li").append("<li>"+jQuery(this).val()+" ("+jQuery(this).parents('.patient').find('.quantity').val()+")</li>")
		}
		
	  });
		
	  jQuery('.checklist-div-inner-gap input[type="checkbox"]:checked').each(function(){
		  selectedCheckList.push(jQuery(this).attr('checklistid'));
	  })
	  // @ViewChild('myDiv') myDiv: ElementRef;
	   // let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
		// el.click();
	
	}
	async apiCalltoGeneratePdf(){
		var prescripArr = [];
		var selectedCheckList = [];
		  jQuery('.dynoprescription').each(function(){
			if(jQuery(this).val()!=''){
				prescripArr.push(jQuery(this).val()+"|"+jQuery(this).parents('.patient').find('.quantity').val());
			}
		  });
		  jQuery('.checklist-div-inner-gap input[type="checkbox"]:checked').each(function(){
			  selectedCheckList.push(jQuery(this).attr('checklistid'));
		  });
		this._userService.savePrescrition({bid:this.booking_id, prescription_arr:prescripArr.join(','), notes:this.patientNotes,  checklist_arr:selectedCheckList.join(',')})
		.subscribe(data => {
			this.loader = false;
			this.patientNotesShowHide=true;
		});

	  setTimeout(()=>{ 
		$('#hitmejquery').trigger("click");
	  },1000);
	}
	
	async getPatientDetails(puid){
		this.loader = true;
		this._userService.getPatientDetails(JSON.parse(localStorage.getItem('vendor')), puid)
		.subscribe(data => {
			this.loader = false;
			this.getPatientDetailsObj = data.result;
			// console.log(this.getPatientDetailsObj);
			setTimeout(()=>{jQuery('.scroll-pane').jScrollPane()},0);
		});
	}
	
	async getBookingDetails(bid){
		this.loader = true;
		this._userService.getBookingDetails(JSON.parse(localStorage.getItem('vendor')), bid)
		.subscribe(data => {
			this.loader = false;
			this.complaint_form = JSON.parse(data.result[0].complaint_form);
			this.getBookingDetailsObj = data.result;
			setTimeout(()=>{baguetteBox.run('.tz-gallery');},0);
		});
	}
	
	async insertNotes(bid){
		// this.loader = true;
		this._userService.insertNotes(bid, this.notes_text)
		.subscribe(data => {
			// this.loader = false;
			this.notesList = data.result;
			this.notes_text='';
			// console.log(data.result, 'this need to be herer');
		});
	}
	
	async getPatientMedicalHistory(puid){
		this.loader = true;
		this._userService.getPatientMedicalHistory(JSON.parse(localStorage.getItem('vendor')), puid)
		.subscribe(data => {
			this.loader = false;
			this.getPatientMedicalHistoryObj = data.result;
			// console.log(this.getPatientMedicalHistoryObj);
			setTimeout(()=>{jQuery('.scroll-pane').jScrollPane()},0);
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
	
  
  timeStart(minutes) {
		// setTimeout(function(){
		jQuery('.dropdown').on('show.bs.dropdown', function(e){
		  jQuery(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
		});

		jQuery('.dropdown').on('hide.bs.dropdown', function(e){
		  jQuery(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
		});

		var clock = jQuery('.clock').FlipClock(minutes*60, {
			autostart: false,
			clockFace: 'MinuteCounter',
			countdown: true
		});
		function startTimer() {
			clock.start();          
		}

		function Timer(duration, display) 
		{
			var timer = duration, hours, minutes, seconds;
			setInterval(function () {
				hours = (timer /3600)%minutes
				minutes = (timer / 60)%60

				hours = hours < 10 ? "0" + hours : hours;
				minutes = minutes < 10 ? "0" + minutes : minutes;

				display.html(hours + "<span class='h_m'>h</span>" + "<span class='clock-dots'>:</span>"+ minutes + "<span class='h_m'>mins</span>");

						--timer;
			}, 1000);
		}

		jQuery(function ($) 
		{
			var twentyFourHours = minutes * 60 * 60;
			var display = $('#remainingTime');
			Timer(twentyFourHours, display);
		});

		jQuery("#progressTimer").progressTimer({
			timeLimit: minutes*60,
			warningThreshold: 10,
			baseStyle: 'btn-primary',
			warningStyle: 'btn-primary',
			completeStyle: 'btn-primary',
			onFinish: function() {
				this.timeshowhide=false;
				this._router.navigate(['dashboard']);
				
				console.log('timer stop');
			}
		});

		// }, 1500);

		
	
	// this.handler.open({
		// name: 'Ourspot',
      // description: 'Dating Site',
      // email: JSON.parse(localStorage['vendor_details'])['email'],
      // amount: 3000
    // });
  }
}

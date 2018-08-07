import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { docUploads } from '../services/user.service';
import { ChatService } from '../services/spot.service';
import { StripeService } from '../services/stripe.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AppSettings } from '../app-settings';
declare var jQuery:any;
declare var baguetteBox:any;
declare var handleError:any;
declare var TimerInterval:any;
declare var counter:any;
declare var OT:any;
@Component({
  selector: 'app-admin-booking-details',
  templateUrl: './admin-booking-details.component.html',
  providers: [UserService, StripeService, ChatService],
  styleUrls: ['./admin-booking-details.component.css']
})
export class AdminBookingDetails implements OnInit {
  
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
  public nearByClinics:any;
  public patientNotesShowHide:boolean=false;
  public token:string = "";
  public notes_text:string = "";
  public booking_id:string = "";
  constructor(private _userService: UserService, private _stripeService: StripeService,private _chatservice: ChatService,  private _router: Router, private activatedRoute:ActivatedRoute) {
	  
  }

ngOnInit(){
	
	this.getDateWiseAppointment(this.appoinmentSelect);
			  this.activatedRoute.params.subscribe((params: Params) => {
					this.booking_id=params['booking_id'];
					this.getPatientDetails(params['uid']);
					this.getBookingDetails(params['booking_id']);
					this.getPatientMedicalHistory(params['uid']);
					this.insertNotes(params['booking_id']);
			  });
			this.getCheckListForDentist();		
			setTimeout(()=>{

			this._userService.getPrevAppointments(JSON.parse(localStorage.getItem('vendor')), this.booking_id).subscribe(data => {
				this.nearByClinics = data.result[0];
				if(data.result[0].checklist_arr){
					if(data.result[0].checklist_arr.indexOf(',')){
						let checkListArr = data.result[0].checklist_arr.split(',');
						setTimeout(()=>{
							for(var i =0;i<checkListArr.length;i++){
								jQuery('input[checklistid='+checkListArr[i]+']').prop('checked', true);
							}
						jQuery('.scroll-pane').jScrollPane();
						baguetteBox.run('.tz-gallery');
						},50);
					}
				}else{
					setTimeout(()=>{
						baguetteBox.run('.tz-gallery');
						jQuery('.scroll-pane').jScrollPane();},50);
				}
				
			});	
		  },1000);
		  // this.notificationObj = JSON.parse(localStorage.getItem('PushSubscribe'));
		  // this.vendorDetail = JSON.parse(localStorage.getItem('vendor'));
			// try {
			  // var res = this._userService.subscribeUserByUid(this.vendorDetail, this.notificationObj);    
			// } 
			// catch(e) {
				// alert("some error "+ e);
				// return;
			// }
	
	
}
	async insertNotes(bid){
		// this.loader = true;
		this._userService.insertNotes(bid, this.notes_text)
		.subscribe(data => {
			// this.loader = false;
			this.notesList = data.result;
			this.notes_text='';
			console.log(data.result, 'this need to be herer');
		});
	}
initializeSession(x) {
var session = OT.initSession(this.apiKey, this.sessionId);
if(x=='connect'){  

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

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
      session.publish(publisher, handleError);
    }
  });
}
else{
session.disconnect();
}
}
	
	async getDateWiseAppointment(appointment){
		this._userService.getDateWiseAppointment(JSON.parse(localStorage.getItem('vendor')), appointment)
		.subscribe(data => {
			// this.loader = false;
			this.appointmentCount = data.total;
			setTimeout(()=>{baguetteBox.run('.tz-gallery');},20);
		});
	}
	
	async getCheckListForDentist(){
		this.loader = true;
		this._userService.getCheckListForDentist()
		.subscribe(data => {
			this.loader = false;
			this.doctorCheckList = data.result;
			setTimeout(()=>{jQuery('.scroll-pane').jScrollPane()},20);
		});
	}

	async getPatientDetails(puid){
		this.loader = true;
		this._userService.getPatientDetails(JSON.parse(localStorage.getItem('vendor')), puid)
		.subscribe(data => {
			this.loader = false;
			this.getPatientDetailsObj = data.result;
			console.log(this.getPatientDetailsObj);
			setTimeout(()=>{jQuery('.scroll-pane').jScrollPane()},40);
		});
	}
	
	async getBookingDetails(bid){
		this.loader = true;
		this._userService.getBookingDetails(JSON.parse(localStorage.getItem('vendor')), bid)
		.subscribe(data => {
			this.loader = false;
			this.complaint_form = JSON.parse(data.result[0].complaint_form);
			this.getBookingDetailsObj = data.result;
			setTimeout(()=>{jQuery('.scroll-pane').jScrollPane()},40);
			setTimeout(()=>{baguetteBox.run('.tz-gallery');},20);
		});
	}
	
	
	async getPatientMedicalHistory(puid){
		this.loader = true;
		this._userService.getPatientMedicalHistory(JSON.parse(localStorage.getItem('vendor')), puid)
		.subscribe(data => {
			this.loader = false;
			this.getPatientMedicalHistoryObj = data.result;
			setTimeout(()=>{jQuery('.scroll-pane').jScrollPane()},40);
			setTimeout(()=>{baguetteBox.run('.tz-gallery');},20);
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
}

import {
  Injectable
} from '@angular/core';
import {Router} from '@angular/router';
import {
  Headers, 
  RequestOptions,
  Http,
  Response,
} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {AppSettings} from '../app-settings';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export class docUploads {
  constructor(public indemnity: string, public indemnity_txt: string, public id_proof:string, public id_proof_txt:string, public bank_details: string, public bank_details_txt: string, public child_protection: string, public child_protection_txt: string, public adult_safeguarding: string,public adult_safeguarding_txt: string, public tooth_fairy_signed: string, public tooth_fairy_signed_txt: string, public id_proof_2: string, public id_proof_2_txt: string, public gdc_doc: string, public gdc_doc_txt: string, public crb_dbs_doc: string, public crb_dbs_doc_txt: string, public graduation_doc: string, public graduation_doc_txt: string, public uid: string) {
  }
}


@Injectable()
export class UserService {
	myGlobalVar;
	super_id;
	super_token;
	super_sessionId;
	super_uid;
	super_booking_id;
	public isUserOrNot:boolean =false; 
  public isUserOnline:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isPlanActive:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	setLoginStatus(isLoggedIn:boolean){
	   this.isUserOnline.next(isLoggedIn);
	}
	
	buttonMakeVisible(btnVisible:boolean){
	   this.isPlanActive.next(btnVisible);
	}
  constructor(private http: Http, private _router: Router) {
	  //this.myGlobalVar=true;
  }
  /* retreive all users */
  // fetchUsers() {
    // return this.http.post(`${AppSettings.BASE_PATH}user/allUserList`)
      // .map((response: Response) =>  {
        // return response.json()
      // });
  // }
	
	setMyVideoSession(id, token='', sessionId='', uid='', booking_id=''){
		debugger;
		this.super_id=id;
		this.super_token=token;
		this.super_sessionId=sessionId;
		this.super_uid=uid;
		this.super_booking_id=booking_id;
		console.log(this.super_id, 'super_id set');
    }
	
	getMyVideoSession(){
		console.log(this.super_id, 'amit kumar');
      return {id:this.super_id, token:this.super_token, sessionId:this.super_sessionId, uid:this.super_uid, booking_id:this.super_booking_id};
    }
	
    setMyGV(val: boolean){
      this.myGlobalVar = val;
    }

    getMyGV(){
      return this.myGlobalVar;
    }
  
  fetchUsers() {
		let bodyString = JSON.stringify({ email: "sk1044ag11@gmail.com", "password":"123456"});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers }); 
		return this.http.post(`${AppSettings.BASE_PATH}user/allUserList`, bodyString, options).map((response: Response) =>  {
			return response.json()
		 })
	}

	fetchMapAreas(data) {
		let bodyString = JSON.stringify({ email: "sk1044ag11@gmail.com", "password":"123456"});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers }); 
		return this.http.get(`${AppSettings.BASE_PATH}user/localdentist?location=${data.lat},${data.lng}&radius=1500`, options).map((response: Response) =>  {
			return response.json()
		 })
	}
  
	 /* delete spot by id */
  delete(uid: string): Promise<any> {
    let bodyString = JSON.stringify({ uid: uid}); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${AppSettings.BASE_PATH}user/remove`, bodyString, options).map((response: Response) =>  {
        // response = response.json()
       if(response.json().code === 200) {
          return true;  
        }
        return false;
     }).toPromise();
  }
	 /* changePayPlan by id */
  changePayPlan(uid: string, userType:string): Promise<any> {
    let bodyString = JSON.stringify({ uid: uid, userType:userType}); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${AppSettings.BASE_PATH}admin/updateUserType`, bodyString, options).map((response: Response) =>  {
        // response = response.json()
       if(response.json().code === 200) {
          return true;  
        }
        return false;
     }).toPromise();
  }

  /* retreive all app users */
  fetchAppUsers() {
    let bodyString = JSON.stringify({ email: "sk1044ag11@gmail.com", "password":"123456"});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    return this.http.post(`${AppSettings.BASE_PATH}user/allUserList`, bodyString, options).map((response: Response) =>  {
		return response.json()
     })
  }
  /* Get vendor Details By id */
  getVendorDetails(userId) {
	let vendorObj = JSON.parse(userId);  
	return this.http.get(`${AppSettings.BASE_PATH}Customers/${vendorObj.userId}?access_token=${vendorObj.id}`)
      .map((response: Response) =>  {
        return response.json();
      }); 
  }
  
  //online offline status indicator
  
	onlineOfflineState(vendorDetails:any, online:any){
		let bodyString = JSON.stringify({ uid: vendorDetails.uid, online:online }); // Stringify payload
		let headers = new Headers({ 'Content-Type': 'application/json'}); // , access_token:vendorDetails.access_token  ... Set content type to JSON
		let options = new RequestOptions({ headers: headers }); // Create a request option
		return this.http.post(`${AppSettings.BASE_PATH}dentist/ofstatustoggle`, bodyString, options).map((response: Response) =>  {
			response = response.json()
			if(response.status === 200) {
			  return true;  
			}
			return false;
		 }).toPromise();
	}
	/* Get vendor Details By id */
	  onlineOfflineStateCheck(userId): Promise<any>  {
		let vendorObj = userId; 
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');    
		myHeaders.append('access_token', vendorObj.token);    
		let options = new RequestOptions({ headers: myHeaders})
		return this.http.get(`${AppSettings.BASE_PATH}dentist/getStatusOnlineOffline?uid=${vendorObj.uid}`, options)
		  .map((response: Response) =>  {
			return response.json();
		  }).toPromise() 
	  }
	
	//callringing status indicator
  
	callringing(vendorDetails:any){
		let bodyString = JSON.stringify({ uid: vendorDetails.uid});
		let headers = new Headers({ 'Content-Type': 'application/json'}); 
		let options = new RequestOptions({ headers: headers });
		return this.http.post(`${AppSettings.BASE_PATH}dentist/callringing`, bodyString, options).map((response: Response) =>  {
			response = response.json()
			if(response.status === 200) {
			  return true;  
			}
			return false;
		 }).toPromise();
	}


	endCallNow(vendorDetails:any){
		let bodyString = JSON.stringify({ uid: vendorDetails.uid}); 
		let headers = new Headers({ 'Content-Type': 'application/json'}); 
		let options = new RequestOptions({ headers: headers }); 
		return this.http.post(`${AppSettings.BASE_PATH}dentist/callended`, bodyString, options).map((response: Response) =>  {
			if(response.json().code === 200) {
			  return true;  
			}
			return false;
		 }).toPromise();
	}
  
  /* Get vendor Details By id */
  getUserDocumentsDetail(userId): Promise<any>  {
	let vendorObj = userId; 
	let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
    myHeaders.append('access_token', vendorObj.token);    
    let options = new RequestOptions({ headers: myHeaders})
	return this.http.get(`${AppSettings.BASE_PATH}dentist/getDocuments?uid=${vendorObj.uid}`, options)
      .map((response: Response) =>  {
        return response.json();
      }).toPromise() 
  }

  getPrevAppointments(userId, bid){
	let vendorObj = userId; 
	let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
    // myHeaders.append('access_token', vendorObj.token);    
    let options = new RequestOptions({ headers: myHeaders})
	let url =`${AppSettings.BASE_PATH}dentist/getPreviousApponimentDetails?did=${vendorObj.uid}&bid=${bid}`;
	if(bid==null){	
		url =`${AppSettings.BASE_PATH}dentist/getPreviousApponimentDetails?did=${vendorObj.uid}`; 
	}
	console.log(url);
	return this.http.get(url, options)
      .map((response: Response) =>  {
        return response.json();
      })
  }


  bankDetails(userId): Promise<any>  {
	let vendorObj = userId; 
	let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');    
    myHeaders.append('access_token', vendorObj.token);    
    let options = new RequestOptions({ headers: myHeaders})
	return this.http.get(`${AppSettings.BASE_PATH}dentist/getbankdetails?uid=${vendorObj.uid}`, options)
      .map((response: Response) =>  {
        return response.json();
      }).toPromise() 
  }
  
    /* Get vendor Details By id */
  // subscribeUserByUid(vendorDetails, notificaitonObj) {
	// // let vendorObj = JSON.parse(userId);  
	// return this.http.get(`${AppSettings.BASE_PATH}Customers/${vendorDetails.userId}?access_token=${vendorDetails.id}`)
      // .map((response: Response) =>  {
        // return response.json();
      // }); 
  // }
  
  
  subscribeUserByUid(vendorDetails:any, notificaitonObj:any): Promise<any> {
    let bodyString = JSON.stringify({ uid: vendorDetails.uid, notificationEndPoint:notificaitonObj }); 
    let headers = new Headers({ 'Content-Type': 'application/json', access_token:vendorDetails.access_token }); 
    let options = new RequestOptions({ headers: headers }); 
    return this.http.post(`${AppSettings.BASE_PATH}admin/subscribe`, bodyString, options).map((response: Response) =>  {
		response = response.json()
        if(response.status === 200) {
          return true;  
        }
        return false;
     }).toPromise();
  }
  
  forgotPassword(email:string): Promise<any> {
	let bodyString = JSON.stringify({ email: email });
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers}); 
    return this.http.post(`${AppSettings.BASE_PATH}admin/doctor/forgotpass`, bodyString, options).map((response: Response) =>  {
        return response.json();
     }).toPromise();
  }
  
  
  
  uploadDocuments(indemnity:any,id_proof:any,id_proof_2:any,graduation_doc:any,crb_dbs_doc:any, gdc_doc:any, bank_details:any,child_protection:any,adult_safeguarding:any, tooth_fairy_signed:any, data:any, fileContent:docUploads, password_pdf:string) : Promise<any> {
		   var formData:FormData = new FormData();
           formData.append('indemnity', indemnity[0]);
           formData.append('indemnity_txt', fileContent.indemnity_txt);
           formData.append('id_proof', id_proof[0]);
		   formData.append('id_proof_txt', fileContent.id_proof_txt);
           formData.append('id_proof_2', id_proof_2[0]);
		   formData.append('id_proof_2_txt', fileContent.id_proof_2_txt);
           formData.append('graduation_doc', graduation_doc[0]);
		   formData.append('graduation_doc_txt', fileContent.graduation_doc_txt);
           formData.append('crb_dbs_doc', crb_dbs_doc[0]);
		   formData.append('crb_dbs_doc_txt', fileContent.crb_dbs_doc_txt);
           formData.append('gdc_doc', gdc_doc[0]);
		   formData.append('gdc_doc_txt', fileContent.gdc_doc_txt);
           formData.append('bank_details', bank_details[0]);
		   formData.append('bank_details_txt', fileContent.bank_details_txt);
           formData.append('child_protection', child_protection[0]);
		   formData.append('child_protection_txt', fileContent.child_protection_txt);
           formData.append('adult_safeguarding', adult_safeguarding[0]);
		   formData.append('adult_safeguarding_txt', fileContent.adult_safeguarding_txt);
           formData.append('tooth_fairy_signed', tooth_fairy_signed[0]);
		   formData.append('tooth_fairy_signed_txt', fileContent.tooth_fairy_signed_txt);
		   formData.append('password', password_pdf);
           formData.append('uid', data['uid'] ? data['uid'] : '');
			var headers = new Headers();
			headers.append('Accept', 'application/json');
			headers.append('access_token',data.token);
			var options = new RequestOptions({ headers: headers }); // Create a request option
			// let headers = new Headers({ 'Content-Type': 'application/json', access_token:data.token });
			var options = new RequestOptions({ headers: headers}); // Create a request option
			return this.http.post(`${AppSettings.BASE_PATH}dentist/uploadDocuments`, formData, options).map((response: Response) =>  {
            response = response.json()
            return response;
         }).toPromise();
     }
	 
	saveBankDetails(vendorDetails:any, bankDetails:any): Promise<any> {
    let finalObj={
		uid: vendorDetails.uid,
		acc_name:bankDetails.acc_name,
		acc_number:bankDetails.acc_number,
		sort_code:bankDetails.sort_code,
		swift_number:bankDetails.swift_number,
		branch_number:bankDetails.branch_number,
		iban_number:bankDetails.iban_number,
	}
	let bodyString = JSON.stringify(finalObj); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json', access_token:vendorDetails.token });
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${AppSettings.BASE_PATH}dentist/savebankdetail`, bodyString, options).map((response: Response) =>  {
		response = response.json()
        if(response.status === 200) {
          return true;  
        }
        return false;
		}).toPromise();
	}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  getVendorCount(userId) {
   return this.http.get(`${AppSettings.BASE_PATH}/users/get-vendor-by-id?id=${userId}`)
      .map((response: Response) =>  {
        response =  response.json();
        if(response.status == 200) {
          return true;
        }
        return false;
      }); 
  }

  /* delete all users */
  deleteUser(uid: string): Promise<any> {
    let bodyString = JSON.stringify({ uid: uid}); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${AppSettings.BASE_PATH}/users/delete`, bodyString, options).map((response: Response) =>  {
        response = response.json()
        if(response.status === 200) {
          return true;  
        }
        return false;
     }).toPromise();
  }


  createUser(data): Promise<any> {
    let bodyString = JSON.stringify(data); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
     return this.http.post(`${AppSettings.BASE_PATH}/users/create`, bodyString, options).map((response: Response) =>  {
        return response.json()
      }).toPromise();
  }
  /* search users near by given lat long or address withing given radius */
  searchNearBy(data) {
    var path = `${AppSettings.BASE_PATH}/users/get-all-users?latlong=${data.latlong}&address=${data.address}&radius=${data.radius}`;
    return this.http.get(path)
      .map((response: Response) =>  {
        return response.json()
      });
  }

/* Get Spot Details By id */
  getSpotDetails(spotId) {
   return this.http.get(`${AppSettings.BASE_PATH}user/get-user-by-id?uid=${spotId}`)
	  .map((response: Response) =>  {
		return response.json();
	  }); 
  }
  
/* getCheckListForDentist */
  getCheckListForDentist() {
   return this.http.get(`${AppSettings.BASE_PATH}dentist/getdentistchecklist`)
	  .map((response: Response) =>  {
		return response.json();
	  }); 
  }
  getPatientDetails(userObj:any, puid:string) { 
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');    
	myHeaders.append('access_token', userObj.token);    
	let options = new RequestOptions({ headers: myHeaders})
    return this.http.get(`${AppSettings.BASE_PATH}dentist/getpatientdetails?uid=${userObj.uid}&puid=${puid}`, options)
	  .map((response: Response) =>  {
		return response.json();
	  }); 
  }
  
    getBookingDetails(userObj:any, bid:string) { 
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');    
	myHeaders.append('access_token', userObj.token);    
	let options = new RequestOptions({ headers: myHeaders})
    return this.http.get(`${AppSettings.BASE_PATH}dentist/bookingDetails?uid=${userObj.uid}&bid=${bid}`, options)
	  .map((response: Response) =>  {
		return response.json();
	  }); 
  }
  
  getPatientMedicalHistory(userObj:any, puid:string) { 
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');    
	myHeaders.append('access_token', userObj.token);    
	let options = new RequestOptions({ headers: myHeaders})
    return this.http.get(`${AppSettings.BASE_PATH}dentist/getpatientmedicalhistory?uid=${userObj.uid}&puid=${puid}`, options)
	  .map((response: Response) =>  {
		return response.json();
	  }); 
  }
  
  getDateWiseAppointment(userObj:any, appointment:string) {
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('access_token', userObj.token);
	let options = new RequestOptions({ headers: myHeaders})
    return this.http.get(`${AppSettings.BASE_PATH}dentist/getBookingCount?did=${userObj.uid}&appoinment=${appointment}`, options)
	  .map((response: Response) =>  {
		return response.json();
	  }); 
  }

/* Get Spot Details By id */
  updateSpot(files, data, removedImages) : Promise<any> {
       var formData:FormData = new FormData();
           for (var i = 0 ; i < files.length ; i++) {
             formData.append('image', files[i]);
           }
			formData.append('uid', data['uid'] ? data['uid'] : '');
			formData.append('firstName', data.firstName ? data.firstName.trim() : '');
			formData.append('lastName', data.lastName ? data.lastName.trim() : '');
			formData.append('dateOfBirth', data.dateOfBirth ? data.dateOfBirth.trim() : '');
			formData.append('title', data.title ? data.title.trim() : '');
			formData.append('email', data.email ? data.email : '');
			formData.append('regNumber', data.regNumber ? data.regNumber.trim() : '');
			formData.append('gender', data.gender ? data.gender.trim() : '');
			var headers = new Headers();
			headers.append('Accept', 'application/json');
			headers.append('access_token',JSON.parse(localStorage.getItem("admin")).token);
			var options = new RequestOptions({ headers: headers }); // Create a request option
			return this.http.post(`${AppSettings.BASE_PATH}user/uploadDP`, formData, options).map((response: Response) =>  {
			if(response.json().code==404){
				alert(response.json().message);
				localStorage.removeItem("admin")
				this._router.navigate(["admin"]);
			}
            return response.json();
         }).toPromise();
     }

  /* REMOVE USER FROM TRUSTED LIST */
  removeFromTrusted(userId): Promise<any> {
    let bodyString = JSON.stringify({ userId: userId }); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${AppSettings.BASE_PATH}/users/remove-from-trusted`, bodyString, options).map((response: Response) =>  {
        response = response.json()
        if(response.status === 200) {
          return true;  
        }
        return false;
     }).toPromise();
  }

  // insertNotes(bid) {
    // let bodyString = JSON.stringify({uid:JSON.parse(localStorage.getItem('vendor')).uid,bid:bid}); // Stringify payload
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = new RequestOptions({ headers: headers }); // Create a request option
    // return this.http.post(`${AppSettings.BASE_PATH}dentist/dentistNotes`, bodyString, options).map((response: Response) =>  {
        // return response.json()
     // })
  // }
// insertNotes(bid:string): Promise<any>  { 
	// let myHeaders = new Headers();
	// let bodyString = JSON.stringify({uid:JSON.parse(localStorage.getItem('vendor')).uid,bid:bid});
	// myHeaders.append('Content-Type', 'application/json');    
	// myHeaders.append('access_token', JSON.parse(localStorage.getItem('vendor')).token);    
	// let options = new RequestOptions({ headers: myHeaders})
    // return this.http.post(`${AppSettings.BASE_PATH}dentist/getpatientmedicalhistory`, bodyString, options)
	  // .map((response: Response) =>  {
		 // response = response.json()
          // if(response.status === 200) {
            // return true;  
          // }
          // return false;
	  // }).toPromise();
  // }
    insertNotes(bid:string, notes_text:string) { 
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');    
		myHeaders.append('access_token', JSON.parse(localStorage.getItem('vendor')).token);    
		let bodyString = JSON.stringify({uid:JSON.parse(localStorage.getItem('vendor')).uid,bid:bid, notes:notes_text});
		let options = new RequestOptions({ headers: myHeaders})
		return this.http.post(`${AppSettings.BASE_PATH}dentist/dentistNotes`, bodyString, options)
		  .map((response: Response) =>  {
			return response.json();
		  }); 
	}
	
	savePrescrition(prescriptionObj) { 
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');    
		myHeaders.append('access_token', JSON.parse(localStorage.getItem('vendor')).token);    
		let bodyString = JSON.stringify(prescriptionObj);
		let options = new RequestOptions({ headers: myHeaders})
		return this.http.post(`${AppSettings.BASE_PATH}booking/savePrescrition`, bodyString, options)
		  .map((response: Response) =>  {
			return response.json();
		  }); 
	}
	
	getPrescription() { 
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');    
		let options = new RequestOptions({ headers: myHeaders})
		return this.http.get(`${AppSettings.BASE_PATH}dentist/prescriptions`, options)
		  .map((response: Response) =>  {
			return response.json();
		  }); 
	}
  
  
  
  
  /* Update user status */
  updateUserStatus(userId, status): Promise<any> {
      let bodyString = JSON.stringify({ user_id: userId, status: status}); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}/users/update-user-status`, bodyString, options).map((response: Response) =>  {
          response = response.json()
          if(response.status === 200) {
            return true;  
          }
          return false;
       }).toPromise();
   }
   

   updateProfile(file,file1, data) : Promise<any> {
    var formData:FormData = new FormData();
        formData.append('image', file);
        formData.append('signature', file1);
        formData.append('uid', data.uid);
        formData.append('dateOfBirth', data.dateOfBirth);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('gender', data.gender);
        formData.append('regNumber', data.regNumber);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('title', data.title);
	var headers = new Headers();
        headers.append('Accept', 'application/json');
    var options = new RequestOptions({ headers: headers }); 
	return this.http.post(`${AppSettings.BASE_PATH}admin/doctor/updatedetails`, formData, options).map((response: Response) =>  {
		console.log(response.json());
	  response = response.json()
	  return response;
	}).toPromise();
  }

   updateVendorProfile(file, data) : Promise<any> {
     var formData:FormData = new FormData();
         formData.append('file', file);
         formData.append('full_name', data.full_name ? data.full_name.trim() : '');
         formData.append('email', data.email ? data.email.trim() : '');
         formData.append('phone', data.phone ? data.phone.trim() : '');
         formData.append('business_name', data.business_name ? data.business_name.trim() : '');
         formData.append('about_me', data.about_me ? data.about_me.trim() : '');
         formData.append('address', data.address ? data.address.trim() : '');
         formData.append('profile_pic', data.profile_pic ? data.profile_pic.trim() : '');
         formData.append('user_id', data['_id'] ? data['_id'].trim() : '');
     var headers = new Headers();
         /** No need to include Content-Type in Angular 4 */
        headers.append('Accept', 'application/json');
     var options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}/users/update-user-profile`, formData, options).map((response: Response) =>  {
          response = response.json()
          return response;
       }).toPromise();
   }
}

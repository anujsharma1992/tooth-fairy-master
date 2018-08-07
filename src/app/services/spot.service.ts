import {  Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Router } from '@angular/router';
import { Headers, RequestOptions,  Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {AppSettings} from '../app-settings';
@Injectable()
export class ChatService {
 
    // constructor(private socket: Socket) { }
 
 
 
 
 
  // private url = 'http://localhost:5000';  
  // private socket;
  
  // sendMessage(message){
    // this.socket.emit('add-message', message);    
  // }
  
  // getMessages() {
    // let observable = new Observable(observer => {
      // this.socket = io(this.url);
      // this.socket.on('message', (data) => {
        // observer.next(data);    
      // });
      // return () => {
        // this.socket.disconnect();
      // };  
    // })     
    // return observable;
  // }  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
	// connect(){
        // this.socket.connect()
    // }
	
    // sendMessage(msg: any){
        // this.socket.emit("chat-list", msg);
    // }
 
    // getMessage() {
		// this.socket.on("calltodentist", function(data){
			// return data;
		// });
        // return this.socket
            // .fromEvent<any>("chat-list")
            // .map((response: Response) =>  {
				// console.clear();
				// console.log(response.json());        
				// return response.json();
		  // });
    // }
    
    // close() {
      // this.socket.disconnect()
    // }
}
@Injectable()
export class SpotService {
  
  constructor(private http: Http, private _router: Router) {
  }
  
  /* retreive all posts by BO Id */
  fetchSpots(vendorId) {
    return this.http.get(`${AppSettings.BASE_PATH}/spots/get-all-spots-by-id?vendor=${vendorId}`)
      .map((response: Response) =>  {
        return response.json();
      });
  }

/* retreive all posts */
  fetchAllSpots() {
    return this.http.get(`${AppSettings.BASE_PATH}admin/doctors`)
      .map((response: Response) =>  {
			console.log(response.json());        
			return response.json();
      });
  }

  fetchCats() {
    return this.http.get(`${AppSettings.BASE_PATH}/spots/get-all-cats`)
      .map((response: Response) =>  {
        console.log(response.json())
        return response.json();
      });
  }
  
  /* Get Spot Details By id */
  getSpotDetails(spotId) {
   return this.http.get(`${AppSettings.BASE_PATH}admin/doctor/get-detail-by-id?uid=${spotId}`)
      .map((response: Response) =>  {
        return response.json();
      }); 
  }
  
  /* delete spot by id */
  delete(uid: string): Promise<any> {
    let bodyString = JSON.stringify({ uid: uid}); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${AppSettings.BASE_PATH}admin/doctor/remove`, bodyString, options).map((response: Response) =>  {
        // response = response.json()
       if(response.json().code === 200) {
          return true;  
        }
        return false;
     }).toPromise();
  }

  // async getPrice(currency: string): Promise<number> {
  //   const response = await this.http.get(this.currentPriceUrl).toPromise();
  //   return response.json().bpi[currency].rate;
  // }
  
  
  
  
  /* Update spot status acitve or deactive */
  updateSpotStatus(spotId, status): Promise<any> {
      let bodyString = JSON.stringify({ uid: spotId}); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}admin/doctor/activate`, bodyString, options).map((response: Response) =>  {
          response = response.json()
          if(response.status === 200) {
            return true;  
          }
          return false;
       }).toPromise();
   }

	verifySpotStatus(spotId, status): Promise<any> {
      let bodyString = JSON.stringify({ uid: spotId}); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}admin/doctor/verify`, bodyString, options).map((response: Response) =>  {
          response = response.json()
          if(response.status === 200) {
            return true;  
          }
          return false;
       }).toPromise();
   }

  
 uploadVideo(files, data, userId, createdBy) : Promise<any> {
     var formData:FormData = new FormData();
         for (var i = 0 ; i < files.length ; i++) {
           formData.append('video', files[i]);
         }
         formData.append('price', data.firstName ? data.firstName.trim() : '');
         formData.append('title', data.title ? data.title.trim() : '');
         formData.append('description', data.lastName ? data.lastName.trim() : '');
     
	 var headers = new Headers();
		headers.append('Accept', 'application/json');
     var options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}admin/videoupload`, formData, options).map((response: Response) =>  {
          response = response.json();
		  console.clear();
		  console.log(response);
          return response;
       }).toPromise();
   }

  /* Create Spot */
   createSpot(files, data, userId, createdBy) : Promise<any> {
     var formData:FormData = new FormData();
         for (var i = 0 ; i < files.length ; i++) {
           formData.append('image', files[i]);
         }
         formData.append('firstName', data.firstName ? data.firstName.trim() : '');
         formData.append('lastName', data.lastName ? data.lastName.trim() : '');
         formData.append('dateOfBirth', data.dateOfBirth ? data.dateOfBirth.trim() : '');
         formData.append('gender', 'm');
         formData.append('userType', 'admin');
         formData.append('realm', '');
         formData.append('username', Math.random());
         formData.append('email', data.email ? data.email.trim() : '');
         formData.append('password',  Math.random());
         formData.append('regNumber', data.regNumber);
         // formData.append('to_hours', data.to_hours ? data.to_hours.trim() : '');
         // formData.append('venue', data.venue ? data.venue.trim() : '');
         // formData.append('created_by', createdBy);  
         // formData.append('user_id', userId);
     var headers = new Headers();
         /** No need to include Content-Type in Angular 4 */
        headers.append('Accept', 'application/json');
     var options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}admin/signup`, formData, options).map((response: Response) =>  {
          response = response.json();
		  console.clear();
		  console.log(response);
          return response;
       }).toPromise();
   }
   /* Update Spot */
    updateSpot(files, data, removedImages) : Promise<any> {
       var formData:FormData = new FormData();
           for (var i = 0 ; i < files.length ; i++) {
             formData.append('image', files[i]);
           }
           // formData.append('removed_images', JSON.stringify(removedImages));
           // formData.append('image', JSON.stringify(data.image));
           formData.append('uid', data['uid'] ? data['uid'] : '');
           formData.append('firstName', data.firstName ? data.firstName.trim() : '');
           formData.append('lastName', data.lastName ? data.lastName.trim() : '');
           formData.append('dateOfBirth', data.dateOfBirth ? data.dateOfBirth.trim() : '');
           formData.append('title', data.title ? data.title.trim() : '');
           formData.append('email', data.email ? data.email : '');
           formData.append('regNumber', data.regNumber ? data.regNumber.trim() : '');
           formData.append('gender', data.gender ? data.gender.trim() : '');
           // formData.append('from_hours', data.from_hours ? data.from_hours.trim() : '');
           // formData.append('to_hours', data.to_hours ? data.to_hours.trim() : '');
           // formData.append('venue', data.venue ? data.venue.trim() : '');
       var headers = new Headers();
           /** No need to include Content-Type in Angular 4 */
          headers.append('Accept', 'application/json');
       var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(`${AppSettings.BASE_PATH}admin/doctor/updatedetails`, formData, options).map((response: Response) =>  {
            response = response.json()
            return response;
         }).toPromise(); 
     }
}

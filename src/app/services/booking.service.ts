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
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {AppSettings} from '../app-settings';
@Injectable()
export class BookingService {
  
  constructor(private http: Http, private _router: Router) {
  }
  
  /* retreive all posts by BO Id */
  fetchBookings(vendorId, bookingId) {
    return this.http.get(`${AppSettings.BASE_PATH}/bookings/listing?vendor=${vendorId}&booking_id=${bookingId}`)
      .map((response: Response) =>  {
        return response.json();
      });
  }
  
  adminfetchBookings(limit, offset, seachText) {
    return this.http.get(`${AppSettings.BASE_PATH}booking/getBooking?limit=${limit}&offset=${offset}&search=${seachText}`)
      .map((response: Response) =>  {
        return response.json();
      });
  }
  
 fetchvideos() {
    return this.http.get(`${AppSettings.BASE_PATH}admin/getAllVideos`)
      .map((response: Response) =>  {
        return response.json();
      });
  }

  getDetails(bookingId) {
   return this.http.get(`${AppSettings.BASE_PATH}/bookings/details?id=${bookingId}`)
      .map((response: Response) =>  {
        return response.json();
      }); 
  }

  getUserDetails(userId) {
   return this.http.get(`${AppSettings.BASE_PATH}/bookings/get-user-details?user_id=${userId}`)
      .map((response: Response) =>  {
        return response.json();
      }); 
  }

  payNow(data) : Promise<any> {
          let bodyString = JSON.stringify(data); // Stringify payload
          // console.log('data in service function', data);
          let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
          let options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}/bookings/pay-full-amount`, bodyString, options).map((response: Response) =>  {
          response = response.json()
          return response;
       }).toPromise();
   }

}

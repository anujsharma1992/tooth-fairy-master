import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, RequestOptions, Http, Response, } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {AppSettings} from '../app-settings';
@Injectable()
export class StripeService {
  constructor(private http: Http, private _router: Router) {
  }
  
  /* Create Payment */
    createPayment(data) : Promise<any> {
          let bodyString = JSON.stringify(data); // Stringify payload
          // console.log('data in service function', data);
          let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
          let options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}/users/charge`, bodyString, options).map((response: Response) =>  {
          response = response.json()
          return response;
       }).toPromise();
   }
}

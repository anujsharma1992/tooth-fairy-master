import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  Headers, 
  RequestOptions,
  Http,
  Response
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {AppSettings} from '../app-settings';
    
export class User {

  constructor(public email: string, public password: string, public username: string) {
  }
}

export class Vendor {
  constructor(public full_name: string,public title: string, public email: string, public phone: string, public password: string, public business_name: string, public about_me: string, public address: string, public image: string, public dateOfBirth: string, public userType: string, public realm: string, public username: string, public gender: string ) {
  }
}

export class Category {
  constructor(public cat_name: string) {
  }
}

export class Spot {
  constructor(public firstName: string, public lastName: string, public title: string, public gender: string, public dateOfBirth: string, public timeOfBirth: string, public regNumber: string, public email: string, public user_id: string, public event_type: string, public vendor: string, public from_hours, public to_hours) {
  }
}

@Injectable()
export class AuthService {
  constructor(private _router: Router, private http: Http){
  }
  /* logout user of application */
  logout(type) {
    var navigateTo;
    var userType;
    if(type == 1) {
      navigateTo = 'login';
      userType = "vendor" 
      localStorage.removeItem('vendor_details');
    } else {
      navigateTo = 'admin';
      userType = "admin" 
      var t = localStorage.removeItem('admin_details');
      
    }
    localStorage.removeItem(userType);
    this._router.navigate([navigateTo]);
  }
  
	
  /* ajax login */
  login (user, type) : Promise<any> {
		var authUrl;
		if(type==1){
			authUrl = `${AppSettings.BASE_PATH}dentist/login`;
		}
		else{
			authUrl = `${AppSettings.BASE_PATH}admin/login`;
		}
		
        var data = { email: user['email'], password: user['password'], type: type.toString()}
        let bodyString = JSON.stringify(data); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(authUrl, bodyString, options).map(res=> {
          res = res.json();
          if(res["code"] == 200) {
            if(type == 1) { // for vendor
              localStorage.setItem("vendor", JSON.stringify(res["result"]));  
              // localStorage.setItem("vendor_details", JSON.stringify(res['data']));  
              this._router.navigate(['dashboard']);      
              return res;
            } else {
				console.log('admin working');
              localStorage.setItem("admin", JSON.stringify(res['result']));  
				var xome=localStorage.getItem("admin");
				// console.log(JSON.parse().result.token);
              // localStorage.setItem("admin_details", JSON.stringify(res['data']));
              this._router.navigate(['admin/dashboard']);      
              return res;
            }
          } else {
            user['email'] = ''
            user['password'] = ''
            return res; 
          }
        })
        .timeout(2000)
        .toPromise()
        
        
  }  
  /* is user valid */

  /* ajax signup */


   signUp(files, data) : Promise<any> {
     var formData:FormData = new FormData();
         for (var i = 0 ; i < files.length ; i++) {
           formData.append('image', files[i]);
         }
         formData.append('title', data.title ? data.title.trim() : '');
         formData.append('firstName', data.firstName ? data.firstName.trim() : '');
         formData.append('lastName', data.lastName ? data.lastName.trim() : '');
         formData.append('dateOfBirth', data.dateOfBirth ? data.dateOfBirth.trim() : '');
         formData.append('gender', 'm');
         formData.append('userType', 'admin');
         formData.append('realm', '');
         formData.append('username', data.email ? data.email.trim() : '');
         formData.append('email', data.email ? data.email.trim() : '');
         formData.append('password',  Math.random().toString(36).slice(-8));
         formData.append('regNumber', data.regNumber);
         formData.append('phone', data.phone);
         formData.append('address', data.address);
     var headers = new Headers();
         /** No need to include Content-Type in Angular 4 */
        headers.append('Accept','application/json');
        headers.append('access_token','CrmOd9Al5pAfIbbyy6eS7bUepvErQRFOqQ0w0lTHmVg');
     var options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(`${AppSettings.BASE_PATH}dentist/signup`, formData, options).map((response: Response) =>  {
          response = response.json();
		  console.clear();
		  console.log(response);
          return response;
       }).toPromise();
   }


  // signUp (user) : Promise<any> {
      // var authUrl = `${AppSettings.BASE_PATH}dentist/signup`;
      // user.phone = String(user.phone)
      // let bodyString = JSON.stringify(user); // Stringify payload
      // console.log(bodyString);
      // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      // let options = new RequestOptions({ headers: headers }); // Create a request option
      // return this.http.post(authUrl, bodyString, options).map(res=> {
        // res = res.json();
        // return res;
      // }).toPromise();
  // } 
   
  checkCredentials(userType: Number) {
    var user = userType === 1 ? 'vendor' : 'admin';
    var navigateTo = userType === 1 ? 'login' : 'admin';
    if (localStorage.getItem(user) === null) {
      this._router.navigate([navigateTo]);
    }  
  } 
}
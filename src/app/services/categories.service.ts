import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {
  Headers, 
  RequestOptions,
  Http,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {AppSettings} from '../app-settings';

@Injectable()
export class CategoriesService {
  constructor(private http: Http, private _router: Router) {
  }
  /* retreive all cats */
  fetchCats() {
    return this.http.get(`${AppSettings.BASE_PATH}/cats/get-all-cats`)
      .map((response: Response) =>  {
        return response.json();
      });
  }
  /* delete category by id */
  deleteCat(uid: string, image: string): Promise<any> {
    let bodyString = JSON.stringify({ uid: uid, image: image }); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${AppSettings.BASE_PATH}/cats/delete`, bodyString, options).map((response: Response) =>  {
        response = response.json()
        if(response.status === 200) {
          return true;  
        }
        return false;
     }).toPromise();
  }

  /* Add category */
  addCategory(data, file) {
    var formData:FormData = new FormData();
        formData.append('file', file);
        formData.append('cat_name', data.cat_name ? data.cat_name.trim() : '');
    var headers = new Headers();
        headers.append('Accept', 'application/json');
     var options = new RequestOptions({ headers: headers }); // Create a request option
     return this.http.post(`${AppSettings.BASE_PATH}/cats/add-category`, formData, options).map((response: Response) =>  {
        return response.json()
     }).toPromise();
  }

  /* Edit category */
  updateCategory(data, file) {
    var formData:FormData = new FormData();
        formData.append('file', file);
        formData.append('cat_name', data.name ? data.name.trim() : '');
        formData.append('cat_id', data._id);
        formData.append('image', data.image);
    var headers = new Headers();
        headers.append('Accept', 'application/json');
     var options = new RequestOptions({ headers: headers }); // Create a request option
     return this.http.post(`${AppSettings.BASE_PATH}/cats/update-category`, formData, options).map((response: Response) =>  {
        return response.json()
     }).toPromise();
  }

}

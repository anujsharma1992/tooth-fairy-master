import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../services/auth.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    public user = new User('' , '', '');
    public errorMsg: string = '';
    public title = 'ToothFairy:Admin LogIn';
    public loader: boolean;
    constructor(private _router: Router, private _service:AuthService) {}
    ngOnInit() {
        if (localStorage.getItem("admin") !== null){
            this._router.navigate(['admin/dashboard']);
        }
    }
    /* Login for Admin */
    async login() {
        this.loader = true;
        if(this.user.email.trim() === '' || this.user.password === '') {
            this.loader = false;
            this.errorMsg = 'Invalid Email or Password';
        } else {
            try {
				console.log(this.user);
                var res = await this._service.login(this.user, 2);
            }
            catch(e) {
               this.errorMsg = 'Invalid Email or Password';
            }
            console.log(res,'this is for testing');
            if(res.status != 200) {
                this.errorMsg = res.message;
            } else {
                this.errorMsg = '';
            }
            this.loader = false;
        }
    }
}

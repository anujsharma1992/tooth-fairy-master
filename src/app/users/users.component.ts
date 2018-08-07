import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../services/auth.service';
declare var jQuery:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [UserService],
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public user = new User('', '', '');
  public success: boolean = false;
  public error: boolean = false;
  public loader: boolean;
  public errMsgVal : string;
  public sucMsgVal : string;
  public submitted : boolean;
  public addFormError: boolean = false;
  public addErrMsgVal: string; 
  public totalUsers: number; 
  public isShowttl: boolean = true; 
  // for search query 
  public address: string = '';
  public lat: number; 
  public long: number; 
  public radius: number; 
  public users: any[];
  /* variable initialization */
  constructor(private _userService: UserService) { // all Dependency should be injected here before use
  }

  /* load all users on ngOnit */
  ngOnInit() {
    // this.loader = true;
    // this._userService.fetchUsers()
		  // .subscribe(userData => {
        // this.users = userData.data;
        // this.totalUsers = userData.user_count;
        // setTimeout(() => {
            // jQuery('table.userdata').dataTable({
                // "language": {
                  // "emptyTable": "No Record Found"
                // },
                // "columnDefs": [{
                  // "defaultContent": "N/A",
                  // "targets": "_all"
                // }],
                // "responsive": true,
                // "aoColumnDefs": [
                  // {
                     // "bSortable": false,
                     // "aTargets": [ -1 ]
                  // }
                // ],
                // "aaSorting": []
            // });
            // this.loader = false;
      // }, 10)

      // });
  }
  /* Block or unblock user  */
  /*async blockUnblock(userId, status, index) {
      this.loader = true;
      if(confirm('Do you want to continue?')) {
         if(await this._userService.blockUnblock(userId, status)) {
             // update users model 
            this.users[index]['is_block'] = status === 0 ? 1 : 0;
            this.loader = false;
            this.success = true;
            this.sucMsgVal = 'User status has been changed successfully.';
         } else {
           this.loader = false;
           this.error  = true;
           this.errMsgVal = 'Some error occurred.';
         }
      } else {
        this.loader = false;
      }
     this.hideMsg()
  }*/
  /* hide all messages */
  hideMsg() {
    setTimeout(function () {
      this.success = false;
      this.error = false;
      this.errMsgVal = ''
      this.sucMsgVal = ''
      this.addFormError  = false;
      this.addErrMsgVal = '';
    }.bind(this),10000)
  }
  /* Delete user by user Id */
  async delete(userId, index) {
    this.loader = true;
    if(confirm('Do you want to continue?')) {
       if(await this._userService.deleteUser(userId)) {
             // update users model 
            this.users.splice(index, 1);
            this.loader = false;
            this.success = true;
            this.sucMsgVal = 'This user has been deleted successfully.';
            if(this.users.length === 0) {
              jQuery('table.userdata tbody').append('<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty">No Record Found</td></tr>')
              this.isShowttl = false;
            }
         } else {
           this.loader = false;
           this.error  = true;
           this.errMsgVal = 'Some error occurred.';
         }
    } else {
      this.loader = false;
    }
    this.hideMsg() 
  }
  /* Add new users */
  async onSubmit(userData) { 
     this.loader = true;
     try {
       var response = await this._userService.createUser(userData)
         if(response.status === 201) {
           if(this.users.length === 0) {
            jQuery('.dataTables_empty').parent().remove()  
          }
          this.users.unshift(response.data);
          this.loader = false;
          this.success = true;
          this.sucMsgVal = response.message; 
          document.getElementById("myModal").click();
         } else {
           this.loader = false;
           this.addFormError  = true;
           this.addErrMsgVal = response.message;
         }
     } 
     catch(e) {
       this.loader = false;
       this.error  = true;
       this.errMsgVal = 'Some error occurred.';
     }
    this.hideMsg() 
  }
  /* Update User Status */
  async updateUserStatus(userId, status, index) {
    this.loader = true;
     try {
       status = status == -1 ? 1 : -1;
       var result = await this._userService.updateUserStatus(userId, status);
       this.users[index]['is_approve'] = status;
       this.sucMsgVal = 'User status has been updated successfully.';
       this.loader = false;
       this.success = true;
     } 
     catch(e) {
       this.errMsgVal = e;
       this.loader = false;
       console.log(e);
       return false;
     }
     this.hideMsg()
  }
}

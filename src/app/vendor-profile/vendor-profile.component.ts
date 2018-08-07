import { Component, OnInit } from '@angular/core';
import { Vendor } from '../services/auth.service'
import { UserService, docUploads } from '../services/user.service'
import { Router } from '@angular/router';
import { AppSettings } from '../app-settings';
declare var jQuery:any;
@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css'],
  providers: [UserService]
})


export class VendorProfileComponent implements OnInit {
	public title2:string = 'ToothFairy:My Profile';
    public errorMsg: string = '';
    public url: string = '';
    public url_signature: string = '';
    public basePathimage = AppSettings.STATIC_PATH;
    public loader: boolean;
    public sucMsgVal: boolean = false;
    public password_pdf: string = '';
    public sucMsg: string = '';
	public isVerifiedMsg : string;
	public profilePageWait:boolean=false;
	public baseImagePath = AppSettings.STATIC_PATH;
	public isVerifyVal : boolean = true;
	public handler: any;
	public docUploaded: boolean = false;
	public docUploadedLinks: boolean = false;
	public fileContent = new docUploads('','','','','','','','','','','','','','','','','','', '','','');
	public simpleDocUrls = new docUploads('','','','','','','','','','','','','','','','','','', '','','');
	public notificationObj: any;
	public sanjeet:string='asd';
	public vendorDetail: any;
	public docloader:any=[false,false,false,false,false,false,false,false,false,false];
	 public addressObj: any = {field1:'', field2:'', field3:''};
	public bankDetails: any = {acc_name:'', acc_number:'', sort_number:'',swift_number:'',branch_number:'',iban_number:''};
	public txtObjectForFiles: any={};
	
    /* Advance Details Fields */
    // public currentVendorDetails : any = JSON.parse(localStorage.getItem('vendor'));
    public vendor = new Vendor('', '', '', '', '', '', '', '', '', '', '', '', '', '');
	constructor(private _router: Router, private _userService: UserService) {
		
    }
readUrl(event:any) {
	
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
      this.url = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }
}
readUrl_signature(event:any) {
	
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
      this.url_signature = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }
}

readUrlFromDoc(event:any, index:number) {
	this.docloader[index]=true;
	if(this.password_pdf=='' || this.password_pdf.length<6){
		jQuery(".password_error").show();
		jQuery("#password_pdf").focus();
		this.docloader[index]=false;
		alert('please enter password before attaching file');
		return false;
	}
	  if (event.target.files && event.target.files[0]) {
			this.uploadDocuments();
			jQuery(".password_error").hide();
	  }
}

onSearchChange(searchValue : string ) {  
	if(this.password_pdf=='' || this.password_pdf.length<6){
		jQuery(".password_error").show();
		jQuery("#password_pdf").focus();
	}else{
		jQuery(".password_error").hide();
	}
}
   	ngOnInit() {
		this.loader=true;
		setTimeout(()=>{
			jQuery('.dateOfBirth').datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: '1950:',
				maxDate: 0,
				dateFormat: 'mm/dd/yy',
				onSelect: function(dateStr) {     
					  var date = jQuery(this).datepicker('getDate');
					  if (date) {
							date.setDate(date.getDate());
					  }
					  jQuery('.end_date').datepicker('option', 'maxDate', date);
				  }
			});
		},90);
           this.vendor = JSON.parse(localStorage.getItem('vendor'));
		   this.vendorDetail = JSON.parse(localStorage.getItem('vendor'));
			if(this.vendor.address){
				this.addressObj.field1=JSON.parse(this.vendor.address).line1;
				this.addressObj.field2=JSON.parse(this.vendor.address).line2;
				this.addressObj.field3=JSON.parse(this.vendor.address).line3;
			}
			this.simplefunction(this.vendorDetail);
			this.bankDetailsFun(this.vendorDetail);
    }

    /* Hide all informational messages from document */
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
	/* Update business owners profile */
	
	LetsSaveFlags(){
		
		alert('save documents');
	}
	
	async uploadDocuments() {
		var indemnity = (<HTMLInputElement>document.getElementById('indemnity'));
		var id_proof = (<HTMLInputElement>document.getElementById('id_proof'));
		var id_proof_2 = (<HTMLInputElement>document.getElementById('id_proof_2'));
		var bank_details = (<HTMLInputElement>document.getElementById('bank_details'));
		var child_protection = (<HTMLInputElement>document.getElementById('child_protection'));
		var adult_safeguarding = (<HTMLInputElement>document.getElementById('adult_safeguarding'));
		var tooth_fairy_signed = (<HTMLInputElement>document.getElementById('tooth_fairy_signed'));
		var graduation_doc = (<HTMLInputElement>document.getElementById('graduation_doc'));
		var crb_dbs_doc = (<HTMLInputElement>document.getElementById('crb_dbs_doc'));
		var gdc_doc = (<HTMLInputElement>document.getElementById('gdc_doc'));
		
        var indemnity_file: FileList = indemnity.files;
        var id_proof_2_file: FileList = id_proof_2.files;
		var graduation_doc_file: FileList = graduation_doc.files;
        var crb_dbs_doc_file: FileList = crb_dbs_doc.files;
        var gdc_doc_file: FileList = gdc_doc.files;
        var id_proof_file: FileList = id_proof.files;
        var bank_details_file: FileList = bank_details.files;
        var child_protection_file: FileList = child_protection.files;
        var adult_safeguarding_file: FileList = adult_safeguarding.files;
        var tooth_fairy_signed_file: FileList = tooth_fairy_signed.files;
	    try { 
          var res = await this._userService.uploadDocuments(indemnity_file, id_proof_file,id_proof_2_file,graduation_doc_file,crb_dbs_doc_file, gdc_doc_file, bank_details_file, child_protection_file, adult_safeguarding_file, tooth_fairy_signed_file, this.vendorDetail, this.fileContent, this.password_pdf);
		  this.docloader=[false,false,false,false,false,false,false,false,false,false];
        } 
        catch(e) {
          this.errorMsg = e.statusText;
          this.errorMsg = 'Internal Server Error!!!';
          this.docloader=[false,false,false,false,false,false,false,false,false,false];
		  return;	
        }
        if(res.code != 201) {
			alert(res.message);
            this.errorMsg = res.message;
        } else {
            this.sucMsgVal = true;
            this.sucMsg = 'document uploaded successfully';
            this.errorMsg = '';
        }
        this.hideMsg();
		this.docloader=[false,false,false,false,false,false,false,false,false,false];
		this.simplefunction(this.vendorDetail);
  }
  
  async saveBank() {
		this.loader = true;
	    try { 
          var res = await this._userService.saveBankDetails(this.vendorDetail, this.bankDetails);
        } 
        catch(e) {
			alert(e);
          this.errorMsg = e.statusText;
          this.errorMsg = 'Internal Server Error!!!';
          this.loader = false;  
          return;	
        }
        this.hideMsg();
        this.loader = false;
		// this._router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(()=>
		// this._router.navigate(["update-profile"]));
  }
  
	async simplefunction(vendorDetail){
	// this.loader=true;
		try { 
          var res = await this._userService.getUserDocumentsDetail(vendorDetail);
		 this.docUploaded=true;
		 if(res.code==200){
			 if(res.result[0]){
				 this.fileContent= res.result[0];
				 this.simpleDocUrls = res.result[0];
				 this.profilePageWait=true;
			  }
			}
			else{
				this.profilePageWait=true;
			}			
			// this.loader=false;
        } 
        catch(e) {
			alert("some error "+ e);
			this.loader=false;
			return;
        }
	}
	
	async bankDetailsFun(vendorDetail){
		try { 
		// debugger;
		this.loader=true;
          var res = await this._userService.bankDetails(vendorDetail);
		 if(res.code==200){
				this.bankDetails= res.result[0];
			}
			else{
				
			}
			this.loader=false;			
        } 
        catch(e) {
			alert("some error "+ e);
			this.loader=false;
			return;
        }
	}
    async updateMyProfile() {
        this.loader = true;
        var inputValue = (<HTMLInputElement>document.getElementById('file'));
        var inputSignature = (<HTMLInputElement>document.getElementById('file_signaure'));
        var fileList: FileList = inputValue.files;
        var fileList1: FileList = inputSignature.files;
        if(fileList.length > 0) {
          var file: File = fileList[0];
        }
		
		if(fileList1.length > 0) {
          var file1: File = fileList1[0];
        }
        try {
		  this.vendor.address=JSON.stringify({line1:this.addressObj.field1, line2:this.addressObj.field2,line3:this.addressObj.field3});
          var res = await this._userService.updateProfile(file, file1, this.vendor);    
			console.log(res);		  
        }
        catch(e) {
          this.errorMsg = e.statusText;
          return;
        }
        if(res.status == 200) {
			
            // this.errorMsg = res.error.parameter_name+' is required';
        } else {
            var data = JSON.parse(localStorage.getItem('vendor'));
                data.firstName=res.result.firstName;
                data.title=res.result.title;
                data.lastName=res.result.lastName;
                data.gender=res.result.gender;
                data.image=res.result.image;
                data.signature=res.result.signature;
                data.address=res.result.address;
                this.addressObj.field1=JSON.parse(res.result.address).line1;
                this.addressObj.field2=JSON.parse(res.result.address).line2;
                this.addressObj.field3=JSON.parse(res.result.address).line3;
                
                data.regNumber=res.result.regNumber;
                data.phone=res.result.phone;
                data.dateOfBirth=res.result.dateOfBirth;
			localStorage.setItem("vendor", JSON.stringify(data));  
			localStorage.setItem("vendor_details", JSON.stringify(data));  
            if(data.image != '') {
              jQuery('#profile_pic').attr('src', this.baseImagePath+data.image);
            }
            this.sucMsgVal = true;
            this.sucMsg = 'Your profile has been updated successfully';
            window.scrollTo(0, 0);
            this.errorMsg = '';
        }
        this.hideMsg();
        this.loader = false;
    }
}

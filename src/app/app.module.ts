 /*--------------------- import ------------------------------ */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import {AppSettings} from './app-settings';
/*-------------------- declaration -----------------------------*/
// import { RouterModule }   from '@angular/router';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = {url: `${AppSettings.ROOT_PATH}`, options: {}};
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { CommonNavComponent } from './common-nav/common-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendorAppointmentDetails } from './vendor-appointment-details/vendor-appointment-details.component';
import { AdminBookingDetails } from './admin-booking-details/admin-booking-details.component';
/* Angular firebase configuration */ 
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { VendorForgotComponent } from './vendor-forgot/vendor-forgot.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { AdminCommonNavComponent } from './admin-common-nav/admin-common-nav.component';
import { AdminVideoGalleryComponent } from './admin-videogallery/admin-videogallery.component';
import { VendorVideoGalleryComponent  } from './vendor-videogallery/vendor-videogallery.component';
import { VendorLocalMapComponent  } from './vendor-local-map/vendor-local-map.component';
import { VendorAppointment  } from './vendor-appointment/vendor-appointment.component';
import { VendorSignupComponent } from './vendor-signup/vendor-signup.component';
/* password & confirm password validation */
import { EqualValidator } from './equal-validator.directive';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { CategoryComponent } from './category/category.component';
import {FileValueAccessor} from './file-control-value-accessor'
import {FileValidator} from './file-input.validator'
/*----------------------- Services --------------------------*/
import { VendorAuthGuard } from './vendor-auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { VendorCreateSpotComponent } from './vendor-create-spot/vendor-create-spot.component';
import { VendorSpotDetailsComponent } from './vendor-spot-details/vendor-spot-details.component';
import { VendorSpotListingComponent } from './vendor-spot-listing/vendor-spot-listing.component';
import { VendorEditSpotComponent } from './vendor-edit-spot/vendor-edit-spot.component';

import { FilterPipe} from './filter.pipe';
import { CapitalizeFirstPipe } from './capitalizefirst.pipe';

import { AdminSpotListingComponent } from './admin-spot-listing/admin-spot-listing.component';
import { AdminAddVendorComponent } from './admin-add-vendor/admin-add-vendor.component';
import { AdminEditVendorComponent } from './admin-edit-vendor/admin-edit-vendor.component';
import { AdminCreateSpotComponent } from './admin-create-spot/admin-create-spot.component';
import { AdminVideoUploadComponent } from './admin-video-upload/admin-video-upload.component';
import { AdminEditSpotComponent } from './admin-edit-spot/admin-edit-spot.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminSpotDetailsComponent } from './admin-spot-details/admin-spot-details.component';
import { VendorBookingsComponent } from './vendor-bookings/vendor-bookings.component';
import { VendorBookingDetailsComponent } from './vendor-booking-details/vendor-booking-details.component';
import { VendorBookingCheckoutComponent } from './vendor-booking-checkout/vendor-booking-checkout.component';
import { AdminUsersListingComponent } from './admin-users-listing/admin-users-listing.component';
import {OpentokModule} from "ng2-opentok/dist/opentok.module"
// import { PaginationModule } from "ng2-bootstrap/pagination";

/* Google Places API */

import {GooglePlaceModule} from "angular2-google-place";
import { PaginationComponent } from './shared/pagination/pagination.component';
// import {LoadingComponent} from "./shared/loading/loading.component";
// import {VideoCallWidgetComponent} from "./shared/video-call-widget/video-call-widget.component";
// import { FileUploadComponent } from './file-upload/file-upload.component';
// New imports to update based on AngularFire2 version 4
@NgModule({
   imports: [
    BrowserModule,
	SocketIoModule.forRoot(config),
    FormsModule,
	// PaginationModule.forRoot(),
    HttpModule,
    AppRoutingModule,
    GooglePlaceModule,
	OpentokModule.forRoot({apiKey: "46094752"}),
	AgmCoreModule.forRoot({
      apiKey: "AIzaSyDRyFYHFdiTi5ZpW_74UwngEMGvvYq1KkQ",
      libraries: ["places"]
    }),
	ReactiveFormsModule,
    // AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    CommonNavComponent,
	FileValueAccessor,
    FileValidator,
    DashboardComponent,
    VendorLoginComponent,
	VendorForgotComponent,
    VendorDashboardComponent,
    AdminCommonNavComponent,
	FilterPipe,
	CapitalizeFirstPipe,
    AdminVideoGalleryComponent,
    VendorVideoGalleryComponent,
    VendorLocalMapComponent,
    VendorAppointment,
	VendorAppointmentDetails,
	AdminBookingDetails,
	AdminVideoUploadComponent,
    VendorSignupComponent,
    EqualValidator,
    VendorProfileComponent,
    CategoryComponent,
    VendorCreateSpotComponent,
    VendorSpotDetailsComponent,
    VendorSpotListingComponent,
    VendorEditSpotComponent,
    AdminSpotListingComponent,
    AdminAddVendorComponent,
    AdminEditVendorComponent,
    AdminCreateSpotComponent,
    AdminEditSpotComponent,
    AdminEditUserComponent,
    AdminSpotDetailsComponent,
	AdminUserDetailsComponent,
    VendorBookingsComponent,
    VendorBookingDetailsComponent,
    VendorBookingCheckoutComponent,
    AdminUsersListingComponent,
    PaginationComponent,
	// LoadingComponent,
	// VideoCallWidgetComponent,
  ],
  providers: [AuthService, VendorAuthGuard, AdminAuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

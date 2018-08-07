import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// All component goes here 
/* Auth Guard for Admin & Vendor */
import { VendorAuthGuard } from './vendor-auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';

/* Admin Routes */
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';

import { AdminAddVendorComponent } from './admin-add-vendor/admin-add-vendor.component';
import { AdminEditVendorComponent } from './admin-edit-vendor/admin-edit-vendor.component';
import { AdminUsersListingComponent } from './admin-users-listing/admin-users-listing.component';
/* Amin Spot Section */
import { AdminVideoGalleryComponent } from './admin-videogallery/admin-videogallery.component';
import { VendorVideoGalleryComponent } from './vendor-videogallery/vendor-videogallery.component';
import { VendorLocalMapComponent } from './vendor-local-map/vendor-local-map.component';
import { VendorAppointment } from './vendor-appointment/vendor-appointment.component';
import { VendorAppointmentDetails } from './vendor-appointment-details/vendor-appointment-details.component';
import { AdminBookingDetails } from './admin-booking-details/admin-booking-details.component';
import { AdminSpotListingComponent } from './admin-spot-listing/admin-spot-listing.component';
import { AdminCreateSpotComponent } from './admin-create-spot/admin-create-spot.component';
import { AdminVideoUploadComponent } from './admin-video-upload/admin-video-upload.component';
import { AdminEditSpotComponent } from './admin-edit-spot/admin-edit-spot.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { AdminSpotDetailsComponent } from './admin-spot-details/admin-spot-details.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';

/* Vendor Routes */
import { CommonNavComponent } from './common-nav/common-nav.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { VendorForgotComponent } from './vendor-forgot/vendor-forgot.component';
import { VendorSignupComponent } from './vendor-signup/vendor-signup.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';

/* Spot's Components */
import { VendorCreateSpotComponent } from './vendor-create-spot/vendor-create-spot.component';
import { VendorSpotListingComponent } from './vendor-spot-listing/vendor-spot-listing.component';
import { VendorSpotDetailsComponent } from './vendor-spot-details/vendor-spot-details.component';
import { VendorEditSpotComponent } from './vendor-edit-spot/vendor-edit-spot.component';


/* Bookings' Component */
import { VendorBookingsComponent } from './vendor-bookings/vendor-bookings.component';
import { VendorBookingDetailsComponent } from './vendor-booking-details/vendor-booking-details.component';
import { VendorBookingCheckoutComponent } from './vendor-booking-checkout/vendor-booking-checkout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: VendorDashboardComponent,
    canActivate: [VendorAuthGuard]
  },
  {
    path: 'signup',
    component: VendorSignupComponent,
  },
  {
    path: 'login',
    component: VendorLoginComponent,
  },
  {
    path: 'forgot',
    component: VendorForgotComponent,
  },
  {
	path: 'dentistgallery',
	component: VendorVideoGalleryComponent,
	canActivate: [VendorAuthGuard]
  },
  {
	path: 'localmap',
	component: VendorLocalMapComponent,
	canActivate: [VendorAuthGuard]
  },
  {
	path: 'appointments',
	children: [
	{
		path: '',
		component: VendorAppointment,
		canActivate: [VendorAuthGuard]
	},
	{
		path: 'details',
		component: VendorAppointmentDetails,
		canActivate: [VendorAuthGuard]
	}
  ]
  },
  {
    path: 'update-profile',
    component: VendorProfileComponent,
    canActivate: [VendorAuthGuard]
  },
  {
    path: 'bookings',
    children: [
      { 
        path: '', 
        component: VendorBookingsComponent,
        canActivate: [VendorAuthGuard]
      },
      { path: 'details/:id', 
        component: VendorBookingDetailsComponent,
        canActivate: [VendorAuthGuard]
      },
      { path: 'checkout/:bookingId/:userId', 
        component: VendorBookingCheckoutComponent,
        canActivate: [VendorAuthGuard]
      }
    ]
  },
  {
    path: 'dentist',
    children: [
      { 
        path: '', 
        component: VendorSpotListingComponent,
        canActivate: [VendorAuthGuard]
      },
      { path: 'create-spot', 
        component: VendorCreateSpotComponent,
        canActivate: [VendorAuthGuard]
      },
      { path: 'details/:id', 
        component: VendorSpotDetailsComponent,
        canActivate: [VendorAuthGuard]
      },
      { path: 'edit/:id', 
        component: VendorEditSpotComponent,
        canActivate: [VendorAuthGuard]
      }
    ]
  },
  { path: 'admin', 
    children: [
      { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
      },
      { path: 'login', 
        component: LoginComponent 
      },
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AdminAuthGuard]
      },
      { 
        path: 'app-users', 
		children:[
		{
			path: '', 
			component: AdminUsersListingComponent,
			canActivate: [AdminAuthGuard]
		},
		{ 
			path: 'details/:id', 
			component: AdminUserDetailsComponent,
			canActivate: [AdminAuthGuard]
		},
		{ 
			path: 'edit/:id', 
			component: AdminEditUserComponent,
			canActivate: [AdminAuthGuard]
		}
	,]
      },
      {
        path: 'users',
        children: [
            { 
              path: '', 
              component: UsersComponent,
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'add',
              component: AdminAddVendorComponent,
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'edit/:id',
              component: AdminEditVendorComponent,
              canActivate: [AdminAuthGuard]
            }
          ]
        },
		
		  {
			path: 'bookings',
			children: [
			  { 
				path: '', 
				component: CategoryComponent,
				canActivate: [AdminAuthGuard]
			  },
			  { path: 'details', 
				component: AdminBookingDetails,
				canActivate: [AdminAuthGuard]
			  }
			]
		  },
	  
	  {
        path: 'videogallery',
        children: [
          { 
            path: '', 
            component: AdminVideoGalleryComponent,
            canActivate: [AdminAuthGuard]
          },
          { 
            path: 'upload', 
            component: AdminVideoUploadComponent,
            canActivate: [AdminAuthGuard]
          },
          { 
            path: 'edit/:id', 
            component: AdminEditSpotComponent,
            canActivate: [AdminAuthGuard]
          },
          { 
            path: 'details/:id', 
            component: AdminSpotDetailsComponent,
            canActivate: [AdminAuthGuard]
          }
        ]
      },
      {
        path: 'dentist',
        children: [
          { 
            path: '', 
            component: AdminSpotListingComponent,
            canActivate: [AdminAuthGuard]
          },
          { 
            path: 'create', 
            component: AdminCreateSpotComponent,
            canActivate: [AdminAuthGuard]
          },
          { 
            path: 'edit/:id', 
            component: AdminEditSpotComponent,
            canActivate: [AdminAuthGuard]
          },
          { 
            path: 'details/:id', 
            component: AdminSpotDetailsComponent,
            canActivate: [AdminAuthGuard]
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: LoginComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

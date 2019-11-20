import {Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home.component';
import {RoomComponent} from './room/room.component';
import {FoodComponent} from './food/food.component';
import {AddroomComponent} from './products/addroom/addroom.component';
import {ContactusComponent} from './contactus/contactus.component';
import {PagenotComponent} from './pagenot/pagenot.component';
import {CartComponent} from './cart/cart.component';
import {FoodCartComponent} from './food-cart/food-cart.component';


export const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'signup', component: UserComponent,
    children: [{path: '', component: SignUpComponent}]
  },
  {
    path: 'login', component: UserComponent,
    children: [{path: '', component: SignInComponent}]
  },
  {
    path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },

  {
    path: 'room', component: RoomComponent,
  },

  {
    path: 'food', component: FoodComponent,
  },

  {
    path: 'addroom', component: AddroomComponent, canActivate: [AuthGuard]

  },
  {
    path: 'contactus', component: ContactusComponent,
  },
  {
    path: 'cart', component: CartComponent,
  },
  {
    path: 'food-cart', component: FoodCartComponent
  },
  {
    path: '**', component: PagenotComponent
  },

];

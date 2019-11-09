// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http'


// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AddroomComponent } from './products/addroom/addroom.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { FoodComponent } from './food/food.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { AddRoomService } from './shared/add-room.service';
import { AddRateService } from './shared/addrate.service';
import { AddFoodService } from './shared/addfood.service';

//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactusComponent } from './contactus/contactus.component';
import { PagenotComponent } from './pagenot/pagenot.component';






@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    HomeComponent,
    RoomComponent,
    FoodComponent,
    AddroomComponent,
    ContactusComponent,
    PagenotComponent,
    
  
  ],


  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    

  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService, AddRoomService, AddRateService,AddFoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }

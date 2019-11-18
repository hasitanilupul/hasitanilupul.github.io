import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RoomCart } from './roomCart.model';

@Injectable({
  providedIn: 'root'
})
export class RoomCartService {

  selectedRoomCart: RoomCart={
    roomId:'',
    custId:'',
    roomtype:'',
    checkin:'',
    checkout:'',

  };

  constructor(private http:HttpClient) { }

  postRoomCart(a,b,c,d,e){
    const reqBody = {
      roomId: a,
      custId: b,
      roomtype:c,
      checkin: d,
      checkout: e,
      
    }
    return this.http.post(environment.apiBaseUrl + '/newcartR', reqBody);
  }


  getCartR(id) {
    return this.http.get(environment.apiBaseUrl + '/roomcartDetails?id='+ id);
  }
  
  getCarts(){
    return this.http.get(environment.apiBaseUrl + '/carts');
  }
  


}


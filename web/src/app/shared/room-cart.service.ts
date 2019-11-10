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
    checkin:'',
    checkout:'',

  };

  constructor(private http:HttpClient) { }

  postRoomCart(a,b,c,d){
    const reqBody = {
      roomId: a,
      custId: b,
      checkin: c,
      checkout: d
    }
    return this.http.post(environment.apiBaseUrl + '/newcartR', reqBody);
  }
}

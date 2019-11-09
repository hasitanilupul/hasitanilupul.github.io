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
  };

  constructor(private http:HttpClient) { }

  postRoomCart(roomCart : RoomCart){
    return this.http.post(environment.apiBaseUrl + '/newcartR', roomCart);
  }
}

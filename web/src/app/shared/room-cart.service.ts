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
  };

  constructor(private http:HttpClient) { }

  postRoomCart(a,b){
    const reqBody = {
      roomId: a,
      custId: b
    }
    return this.http.post(environment.apiBaseUrl + '/newcartR', reqBody);
  }
}

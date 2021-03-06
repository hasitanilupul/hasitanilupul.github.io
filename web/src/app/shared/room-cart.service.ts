import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RoomCart } from './roomCart.model';
import { RoomDTO } from '../dto/RoomDTO';
import { Observable } from 'rxjs';

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

  postFoodCart(a,b,c){
    const reqBody ={
      uid :a,
      fid :b,
      name :c
    }
    return this.http.post(environment.apiBaseUrl + '/newcartF', reqBody);
  }


  getCartR(id) {
    return this.http.get(environment.apiBaseUrl + '/roomcartDetails?id='+ id);
  }
  
  getCarts(){
    return this.http.get(environment.apiBaseUrl + '/carts');
  }
  

  getRoomDetails(id){
    return this.http.get(environment.apiBaseUrl + '/findRoomByDocumnetID/' + id);
  }

  deletecart(_id: string){
    return this.http.delete('http://localhost:3000/api/deletecart/' + _id);
  }




  // getFoods(){
  //   return this.http.get(environment.apiBaseUrl + '/foods');
  // }

  // getFoodDetails(id){
  //   return this.http.get(environment.apiBaseUrl + '/findFoomByDocumnetID/' + id);
  // }

}


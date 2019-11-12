import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Room } from './addRoom.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddRoomService {
  selectedRoom: Room = {
    _id: '',
    type: '',
    price: '',
    catagory: '',
    ac: '',
    capacity: '',
    userPic:'',
  };


  constructor(private http: HttpClient) { }

  postRoom(a,b,c,d,e,f,g) {
    const reqBody={
      _id:a,
      type:b,
      price:c,
      catagory:d,
      ac:e,
      capacity:f,
      userPic:g

    }
    return this.http.post(environment.apiBaseUrl + '/newroom', reqBody);
  }

  getAddRoom(id) {
    return this.http.get(environment.apiBaseUrl + '/roomDetails?id=' + id);
  }

  getRooms() {
    return this.http.get(environment.apiBaseUrl + '/rooms');
  }

  putRoom(room: Room ){
    return this.http.put('http://localhost:3000/api/uproom',room);
  }

  deleteRoom(_id: string){
    return this.http.delete('http://localhost:3000/api/delete/' + _id);
  }

}

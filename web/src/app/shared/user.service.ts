import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { UserDTO } from '../dto/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    _id:'',
    fName: '',
    lName: '',
    id: '',
    email: '',
    tp: '',
    role:'3',
    password: '',
    saltSecret:'',
    userPic:'',
  };






  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }



  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  getUserProfilebyid(id) {
    return this.http.get(environment.apiBaseUrl + '/getuserbyid',{params:{_id: id}, observe: 'response'});
  }


  putUser(user: User){
    return this.http.put('http://localhost:3000/api/upuser', user)
  }

  getUserByDocumnetID(id) {
    return this.http.get('http://localhost:3000/api/getUserByID/' + id);
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload){
      return userPayload.exp > Date.now() / 1000;
    }
    else
      return false;
  } 


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

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
    password: '',
    saltSecret:'',
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

  putUser(user: User){
    return this.http.put('http://localhost:3000/api/upuser', user)
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
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  } 

  // isAdmin() {
  //   this.getUserProfile().subscribe(
  //     res => {
  //       this.userDetails = res['user'];
  //     },
  //     err => {
  //       console.log(err);

  //     }
  //   )
  //   if (this.selectedUser.email == "admin@gmail.com") {
  //     console.log('admin')
  //     return 1;
  //   }
  //   else {
  //     console.log(this.userDetails.email)
  //     return 0;
  //   }

  // }

}

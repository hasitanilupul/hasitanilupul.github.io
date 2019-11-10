import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { resUser } from './resUser.model';

@Injectable({
  providedIn: 'root'
})
export class ResUserService {

  selectedresUser: resUser = {
    // _id:'',
    fName: '',
    lName: '',
    id: '',
    email: '',
    tp: '',
    role:'2',
    password: '',
    // saltSecret:'',
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postresUser(resUser: resUser) {
    return this.http.post(environment.apiBaseUrl + '/register', resUser, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

}

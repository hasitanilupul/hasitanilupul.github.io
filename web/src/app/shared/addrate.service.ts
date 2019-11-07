import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Rate } from './addRate.model';

@Injectable({
  providedIn: 'root'
})
export class AddRateService {

  selectedRate: Rate={
    name:'',
    comment:'',
  };

  constructor(private http: HttpClient) { }

  postRate(rate : Rate){
    return this.http.post(environment.apiBaseUrl + '/newrate', rate);
  }

  getAddRate(id) {
    return this.http.get(environment.apiBaseUrl + '/rateDetails?id='+id);
  }

  getRates(){
    return this.http.get(environment.apiBaseUrl + '/rates');
  }

  deleteitem(_id: string){
    return this.http.delete('http://localhost:3000/api/deleteitem/' + _id);
  }

}

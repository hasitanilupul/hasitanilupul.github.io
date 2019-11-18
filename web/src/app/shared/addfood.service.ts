import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './addFood.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddFoodService {
  selectedFood: Food = {
    _id:'',
    type: '',
    name: '',
    price:'',
    foodPic:'',
  };

  constructor(private http: HttpClient) { }

  postFood(b,c,d,e) {
    const reqBody={
      type:b,
      name:c,
      price:d,
      foodPic:e,
    }
    return this.http.post(environment.apiBaseUrl + '/newfood', reqBody);
  }

  getAddFood(id) {
    return this.http.get(environment.apiBaseUrl + '/foodDetails?id=' + id);
  }

  getFoods() {
    return this.http.get(environment.apiBaseUrl + '/foods');
  }

  putFood(food: Food ){
    return this.http.put('http://localhost:3000/api/upfood', food);
  }

  deleteFood(_id: string){
    return this.http.delete('http://localhost:3000/api/deletefood/' + _id);
  }

}

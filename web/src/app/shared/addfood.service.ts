import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Food} from './addFood.model';
import {environment} from '../../environments/environment';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AddFoodService {
  selectedFood: Food = {
    _id: '',
    type: '',
    name: '',
    price: '',
    foodPic: '',
  };

  constructor(private http: HttpClient) {
  }

  postFood(form) {
    const reqBody = CommonService.convertToFormData(form);
    return this.http.post(environment.apiBaseUrl + '/newfood', reqBody);
  }

  getAddFood(id) {
    return this.http.get(environment.apiBaseUrl + '/foodDetails?id=' + id);
  }

  getFoods() {
    return this.http.get(environment.apiBaseUrl + '/foods');
  }

  putFood(food: Food) {
    return this.http.put('http://localhost:3000/api/upfood', food);
  }

  deleteFood(_id: string) {
    return this.http.delete('http://localhost:3000/api/deletefood/' + _id);
  }

}

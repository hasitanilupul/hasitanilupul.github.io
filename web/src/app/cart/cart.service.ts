import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  static cartItems = [];

  constructor(private http: HttpClient) {
  }

  getItems() {
    return CartService.cartItems;
  }

  getItemCount() {
    return CartService.cartItems.length;
  }

  addItem(item) {
    console.log(item);
    CartService.cartItems.push(item);
  }

  removeItem(item) {
    CartService.cartItems.splice(CartService.cartItems.indexOf(x => x._id === item._id), 1);
  }

  contains(item) {
    return CartService.cartItems.some(x => x._id === item._id);
  }

  placeOrder() {
    const uid = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))._id;
    const items = [];
    CartService.cartItems.forEach(item => {
      items.push({
        food: item,
        quantity: item.quantity
      });
    });

    const body = {
      items: items,
      user: uid
    };
    CartService.cartItems = [];
    return this.http.post(`${environment.apiBaseUrl}/order/add`, body);
  }

  getUserOrders() {
    const uid = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))._id;
    return this.http.get(`${environment.apiBaseUrl}/order/get/user/${uid}`);
  }

  getAllOrders(){
    return this.http.get(`${environment.apiBaseUrl}/order/get/all`);
  }
}

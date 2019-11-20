import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart/cart.service';

@Component({
  selector: 'app-food-cart',
  templateUrl: './food-cart.component.html',
  styleUrls: ['./food-cart.component.css']
})
export class FoodCartComponent implements OnInit {

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
  }

  orderNow() {
    this.cartService.placeOrder().subscribe(val => {
      console.log(val);
    });
  }

}

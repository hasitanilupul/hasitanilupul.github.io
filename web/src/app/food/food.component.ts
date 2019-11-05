import { Component, OnInit } from '@angular/core';
import { AddFoodService } from '../shared/addfood.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foods: any[];
  constructor(private AddFoodService: AddFoodService) { }

  ngOnInit() {
    this.AddFoodService.getFoods().subscribe(
      res => {
        this.foods = res['food']
        console.log(res['room'])
      },
      err => {
        console.log(err);
      }
    );
  }

}

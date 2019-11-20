import { Component, OnInit } from '@angular/core';
import { AddFoodService } from '../shared/addfood.service';
import { RoomCartService } from '../shared/room-cart.service'

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foods: any[];
  constructor(private AddFoodService: AddFoodService, private roomCartService : RoomCartService) { }

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

  onSubmit(fid,name){
    var data = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    this.roomCartService.postFoodCart(data._id,fid,name).subscribe(
      res =>{
       console.log(res);
       alert('Succesfully Added')
      },
      err =>{
        if (err.status === 422) {
          console.log('err');
        } else {
          console.log('Contact admin');
        }
      }
    )

  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AddRoomService } from '../shared/add-room.service';
import { RoomCartService } from '../shared/room-cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  carts: any[];
  cus: any[] = [];
  constructor(private userServise: UserService, private addRoomService: AddRoomService, private roomCartServise: RoomCartService) { }

  ngOnInit() {

    this.roomCartServise.getCarts().subscribe(
      res => {
        this.carts = res['cart'];
        for (let i = 0; i < this.carts.length; i++) {
        
           
          
          
           this.userServise.getUserProfilebyid(this.carts[i].custId).subscribe(res =>{

             this.cus[i] = res;
           },err =>{
             console.log( err);
           });
          
          console.log(this.carts[i].custId);
          // console.log(this.cus[i]);
        }
      },
      err => {
        console.log(err)
      }
    )

  }

  refreshcartList() {
    this.roomCartServise.getCarts().subscribe((res) => {
      this.carts = res['cart'];
    })
  }

  heads = ['custId', 'RoomId','Room type', 'chech in', 'check out', 'Setting'];

}

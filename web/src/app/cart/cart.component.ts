import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AddRoomService} from '../shared/add-room.service';
import {RoomCartService} from '../shared/room-cart.service';
import {CartDTO} from '../dto/CartDTO';
import {RoomDTO} from '../dto/RoomDTO';
import {UserDTO} from '../dto/UserDTO';
import {AddFoodService} from '../shared/addfood.service';
import {CartService} from './cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  carts: CartDTO[] = [];
  cus: any[] = [];

  foodOrders: any[];

  // foods : FoodDTO[] = [];

  constructor(private userServise: UserService, private addRoomService: AddRoomService, private roomCartServise: RoomCartService, private addFoodService: AddFoodService,
              private cartService: CartService) {

    this.roomCartServise.getCarts().subscribe(
      res => {
        this.carts = res['cart'];
        let i = 0;
        for (let x of this.carts) {

          this.roomCartServise.getRoomDetails(x['custId']).subscribe(y => {
            x.room = JSON.parse(JSON.stringify(y));
          });

          this.userServise.getUserByDocumnetID(x['roomId']).subscribe(z => {
            x.user = JSON.parse(JSON.stringify(z));
          });
        }
        console.log(this.carts);
      },
      err => {
        console.log(err);
      }
    );

    // this.roomCartServise.getFoods().subscribe(
    //   res => {
    //     this.foods = res['food'];
    //     let i = 0;
    //     for(let x of this.foods){
    //       this.roomCartServise.getFoodDetails(x['custId']).subscribe(y=>{
    //         x.food = JSON.parse(JSON.stringify(y));
    //       });
    //       this.userServise.getUserByDocumnetID(x['foodId']).subscribe(z=>{
    //         x.user =JSON.parse(JSON.stringify(z));
    //       });
    //     }
    //     console.log(this.foods);
    //   },
    //   err =>{
    //     console.log(err)
    //   }
    // )


  }

  roomD: any;

  ngOnInit() {

    if (localStorage.getItem('admin') !== '3') {
      this.cartService.getAllOrders().subscribe((val: any[]) => {
        console.log(val);
        this.foodOrders = val;
      });
    } else {
      this.cartService.getUserOrders().subscribe((val: any[]) => {
        console.log(val);
        this.foodOrders = val;
      });
    }


  }

  refreshcartList() {
    this.roomCartServise.getCarts().subscribe((res) => {
      this.carts = res['cart'];
    });
  }

  deleteCart(_id: string) {
    if (confirm('Are you sure delete this record ?') == true) {
      this.roomCartServise.deletecart(_id).subscribe((res) => {
        console.log(_id);
        location.reload();
      });
    }
  }


  heads = ['Customer ID', 'Customer Name', 'Room Category', 'Room Type', 'chech in', 'check out', 'Setting'];
}

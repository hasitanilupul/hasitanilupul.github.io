import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AddRoomService } from '../shared/add-room.service';
import { RoomCartService } from '../shared/room-cart.service';
import { CartDTO } from '../dto/CartDTO';
import { RoomDTO } from '../dto/RoomDTO';
import { UserDTO } from '../dto/UserDTO';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  carts : CartDTO[] = [];
  cus: any[] = [];
  constructor(private userServise: UserService, private addRoomService: AddRoomService, private roomCartServise: RoomCartService) { 

    this.roomCartServise.getCarts().subscribe(
      res => {
        
        this.carts = res['cart'];
        // for (let i = 0; i < this.carts.length; i++) {
        
        //    this.userServise.getUserProfilebyid(this.carts[i].custId).subscribe(res =>{

        //      this.cus[i] = res;
        //    },err =>{
        //      console.log( err);
        //    });
          
        //   console.log(this.carts[i].custId);
        //   // console.log(this.cus[i]);
        // }

       let i = 0;
        for(let x of this.carts){
          
          this.roomCartServise.getRoomDetails(x['custId']).subscribe(y=> {
              x.room = JSON.parse(JSON.stringify(y));
          });

          this.userServise.getUserByDocumnetID(x['roomId']).subscribe(z=> {
            x.user = JSON.parse(JSON.stringify(z));
          });
         
        }

        console.log(this.carts);

      },
      err => {
        console.log(err)
      }
    )

  }

  roomD : any;

  ngOnInit() {

   
  }

  refreshcartList() {
    this.roomCartServise.getCarts().subscribe((res) => {
      this.carts = res['cart'];
    })
  }

  deleteCart(_id: string) {
    if (confirm('Are you sure delete this record ?') == true) {
      this.roomCartServise.deletecart(_id).subscribe((res) => {
        console.log(_id);
        location.reload();
      });
    }
  }


  heads = ['Customer ID','Customer Name', 'Room Category','Room Type', 'chech in', 'check out', 'Setting'];
}

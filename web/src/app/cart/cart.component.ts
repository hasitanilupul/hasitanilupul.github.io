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

  constructor(private userServise : UserService, private addRoomService: AddRoomService, private roomCartServise : RoomCartService) { }

  ngOnInit() {
  }

}

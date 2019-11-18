import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { AddRoomService } from '../shared/add-room.service';
import { UserService } from '../shared/user.service'
import { RoomCartService } from '../shared/room-cart.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations:[
    trigger('fade',[
      
      transition(':leave',[
        style({ opacity: 0}),
        animate(2000)

      ]) 
    ])
  ]

  
})
export class RoomComponent implements OnInit {



  rooms: any[];
  constructor(private AddRoomService: AddRoomService, private UserService:UserService, private RoomCartService:RoomCartService) { }
   
  checkout;
  checkin;

  ngOnInit() {
    this.AddRoomService.getRooms().subscribe(
      res => {
        
        this.rooms = res['room']
        console.log(res['room'])
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(rid,roomtype){

    var data = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    console.log(data);
    console.log(rid);
    console.log(roomtype);
    // console.log(chout)
    
    this.RoomCartService.postRoomCart(data._id,rid,roomtype,this.checkin,this.checkout).subscribe(
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

  onChangeInDate(event){
    console.log( event.srcElement.value);
    this.checkin = event.srcElement.value;
  }

  onChangeOutDate(event){
    console.log( event.srcElement.value);
    this.checkout =event.srcElement.value;
  }



}


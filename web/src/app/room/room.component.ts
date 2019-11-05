import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { AddRoomService } from '../shared/add-room.service';
import { UserService } from '../shared/user.service';


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
  constructor(private AddRoomService: AddRoomService) { }
   

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

  onSubmit(){
    console.log(this.rooms)
  }


}


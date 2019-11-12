import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AddRoomService } from '../../shared/add-room.service';
import { AddFoodService } from '../../shared/addfood.service';
import { Room } from '../../shared/addRoom.model'
import { __param } from 'tslib';
import { Food } from 'src/app/shared/addFood.model';


@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css'],
  providers: [AddRoomService, AddFoodService]
})
export class AddroomComponent implements OnInit {

  showSucessMessage: boolean;
  serverErroeMessages: String;
  showSucessMessage1: boolean;
  serverErroeMessages1: String;
  showUpdateMessage: boolean;

  rooms: any[];
  foods: any[];
  pic;
  preview;
  constructor(private addroomService: AddRoomService, private addfoodService: AddFoodService) { }

  ngOnInit() {
    this.addroomService.getRooms().subscribe(
      res => {
        this.rooms = res['room']
        console.log(res['room'])
      },
      err => {
        console.log(err);
      }
    )

    this.addfoodService.getFoods().subscribe(
      res => {
        this.foods = res['food']
        console.log(res['food'])
      },
      err => {
        console.log(err);
      }
    )
  }

  onSubmit(form: NgForm) {

    if (1 > form.value._id) {
      console.log(form.value._id);
      this.addroomService.postRoom(form.value._id,form.value.type,form.value.price,form.value.catagory,form.value.ac,form.value.capacity,this.preview).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.refreshRoomList();
        },
        err => {
          if (err.status === 422) {
            this.serverErroeMessages = err.error.join('<br/>');
            this.refreshRoomList();
          } else {
            this.refreshRoomList();
            this.serverErroeMessages = 'Something wrong contact admin.!';
          }
        }
      );

    } else {
      console.log(form.value._id);
      this.addroomService.putRoom(form.value).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.refreshRoomList();
        },
        err => {
          if (err.status === 422) {
            this.serverErroeMessages = err.error.join('<br/>');
            this.refreshRoomList();
          } else {
            this.refreshRoomList();
            this.serverErroeMessages = 'Something wrong contact admin.!';
          }
        }
      );
    }


    // else{
    // this.addroomService.putRoom(form.value).subscribe(
    //   res => {
    //     this.showUpdateMessage = true;
    //     setTimeout(() => this.showUpdateMessage = false, 4000);
    //     this.refreshRoomList();
    // })
    // }

  }

  one(form: NgForm) {
    
        if (1 > form.value._id) {
          console.log(form.value.type);
    this.addfoodService.postFood(form.value.type,form.value.name,form.value.price,this.preview).subscribe(
      res => {
        this.showSucessMessage1 = true;
        this.refreshFoodList();
        setTimeout(() => this.showSucessMessage1 = false, 4000);
      },
      err => {
        if (err.status === 422) {
          this.serverErroeMessages1 = err.error.join('<br/>');
          this.refreshFoodList();
        } else {
          this.serverErroeMessages1 = 'Something wrong contact admin.!';
          this.refreshFoodList();
        }
      }
    );

  }else{
    
    this.addfoodService.putFood(form.value).subscribe(
      res => {
        this.showSucessMessage1 = true;
        this.refreshFoodList();
        setTimeout(() => this.showSucessMessage1 = false, 4000);
      },
      err => {
        if (err.status === 422) {
          this.serverErroeMessages1 = err.error.join('<br/>');
          this.refreshFoodList();
        } else {
          this.serverErroeMessages1 = 'Something wrong contact admin.!';
          this.refreshFoodList();
        }
      }
    );

  }
}

  refreshRoomList() {
    this.addroomService.getRooms().subscribe((res) => {
      this.rooms = res['room'];
    })
  }

  refreshFoodList() {
    this.addfoodService.getFoods().subscribe((res) => {
      this.foods = res['food'];
    })
  }

  onEdit(room: Room) {
    this.addroomService.selectedRoom = room;
  }

  onEdit1(food: Food) {
    this.addfoodService.selectedFood = food;
  }

  deleteRoom(_id:string, form: NgForm){
    if(confirm('Are you sure delete this record ?') == true){
      this.addroomService.deleteRoom(_id).subscribe((res)=>{
        this.refreshRoomList();
        this.resetForm(form);
      });
    }
  }

  deleteFood(_id:string, form: NgForm){
    if(confirm('Are you sure delete this record ?') == true){
      this.addfoodService.deleteFood(_id).subscribe((res)=>{
        this.refreshFoodList();
        this.resetForm(form);
      });
    }
  }

  resetForm(form: NgForm) {
    this.addroomService.selectedRoom = {
      _id: '',
      type: '',
      price: '',
      ac: '',
      capacity: '',
      catagory: '',
      userPic:'',
    };
  }

  resetFood(form: NgForm) {
    this.addfoodService.selectedFood = {
      _id: '',
      type: '',
      name: '',
      price: '',
      foodPic: '',
    };
  }

  addPic(event){
    this.pic=(event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.pic);
    reader.onload = () => {
      this.preview = reader.result as string;
    }
  }

  addfoodPic(event){
    this.pic=(event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.pic);
    reader.onload = () => {
      this.preview = reader.result as string;
    }
  }


  headsRoom = ['Type', 'Price', 'Catagory', 'AC', 'Capacity', 'Image','Setting'];
  headsFood = ['Type', 'Name', 'Price', 'Image','Setting'];
}

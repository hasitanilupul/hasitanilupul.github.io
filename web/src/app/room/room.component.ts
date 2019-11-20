import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { AddRoomService } from '../shared/add-room.service';
import { UserService } from '../shared/user.service'
import { RoomCartService } from '../shared/room-cart.service';
import { PayhereService} from '../shared/payhere.service';

declare var payhere: any;

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



  roomPrice;
  roomType;
  rooms: any[];
  constructor(private AddRoomService: AddRoomService, private UserService:UserService, private RoomCartService:RoomCartService, private PayService:PayhereService) { }
   
  data;
  checkout;
  checkin;

  ngOnInit() {
    this.data = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    console.log(this.data._id)
    this.AddRoomService.getRooms().subscribe(
      res => {
        
        this.rooms = res['room'];
        // console.log(this.rooms);
        // console.log(this.rooms['price']);
      },
      err => {
        console.log(err);
      }
    );


    payhere.onCompleted=(orderId)=>{
      alert('Payment is successfull '+orderId);
      this.sendrecord();
      console.log('succdcdjk')
  }

  payhere.onDismissed = function onDismissed() {
    alert('Payment dismissed');
    
  };

  payhere.onError = function onError(error) {
    alert('Error:' + error);
  };


  }

  onSubmit(rid,roomtype){

    var data = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    console.log(data);
    // console.log(rid);
    // console.log(roomtype);
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



  payNow(roomPrice, roomType){

    this.roomPrice=roomPrice;
    this.roomType=roomType;
    console.log(this.roomType, this.roomPrice);


    const payment = {
      sandbox: true,
      merchant_id: '1213116',       // Replace your payhere Merchant ID /*Goto payhere account -> settings-> copy merchantId and replace */
      return_url: 'http://sample.com/return',
      cancel_url: 'http://sample.com/cancel',
      notify_url: 'http://sample.com/notify/',
      order_id: this.data._id +' 01', //replace value of this field as your requirement
      items: 'xxxxxx' ,
      amount: this.roomPrice,
      currency: 'USD',
       adOwnerId: "xxxx", 
      first_name: "sunil",
      last_name: 'Perera',
      email: "sample_user@gmail.com",
      phone: '0771234567',
      address: 'No.1, Galle Road',
      city: 'Colombo',
      country: 'Sri Lanka',
      delivery_address: 'No. 46, Galle road, Kalutara South',
      delivery_city: 'Kalutara',
      delivery_country: 'Sri Lanka',
  
  /**
  * Above fields of payment are compulsory.
  */
  
  
    };

    payhere.startPayment(payment);



  }
  sendrecord(){

    this.PayService.postrecord({roomType:this.roomType, price:this.roomPrice, _id:this.data._id}).then((result)=>{
      console.log('success');
    },(err)=>{
      console.log(err);
    });
    
    
    }

}


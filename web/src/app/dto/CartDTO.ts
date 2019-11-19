import { RoomDTO } from './RoomDTO';
import { UserDTO } from './UserDTO';

export class CartDTO {

    _id: string;
    roomId: string;
    custId: string;
    roomtype: string;
    checkin:string;
    checkout: string;
     __v: string;

    room : RoomDTO = new RoomDTO();
    user : UserDTO = new UserDTO();
}
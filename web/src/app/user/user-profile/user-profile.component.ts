import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { NgForm } from '@angular/forms';
import { __param } from 'tslib';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit  {
  userDetails = new User//{email:'',fName:'',id:'',lName:'',tp:'',_id:''};
  user: any[];
  role;


  showSucessMessage: boolean;
  serverErroeMessages: String;
  showSucessMessage1: boolean;
  serverErroeMessages1: String;
  showUpdateMessage: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
    
    this.role=localStorage.getItem('admin');
    

  }

  onLogout() {
    this.userService.deleteToken();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onEdit(user: User) {
    this.userService.selectedUser = this.userDetails;
  }

  onSubmit(form: NgForm) {
    this.userService.putUser(form.value).subscribe(
      res => {
        this.showSucessMessage1 = true;

        setTimeout(() => this.showSucessMessage1 = false, 4000);
      },
      err => {
        if (err.status === 422) {
          this.serverErroeMessages1 = err.error.join('<br/>');

        } else {
          this.serverErroeMessages1 = 'Something wrong contact admin.!';

        }
      }
    );


  }

  Admin() {
    if (this.userDetails.email == "admin@gmail.com") {
      localStorage.setItem('admin', '1');
      //  console.log(localStorage.getItem('admin'))
    }else if(this.userDetails.role ==null){
      localStorage.setItem('admin','3')
    }
    else{
      console.log()
    }

  }

}
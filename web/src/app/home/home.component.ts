import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddRateService } from '../shared/addrate.service';
import { Router } from '@angular/router';
import { ResUserService } from '../../app/shared/res-user.service'
import { resUser } from 'src/app/shared/resuser.model';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AddRateService, ResUserService]
})
export class HomeComponent implements OnInit {

    


  public val = true;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  tpRegex = /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;

  showSucessMessage: boolean;
  serverErroeMessages: String;
  serverErrorMessages: String;

  userDetails = new resUser;
  role;
  data;

  rates: any[];



  constructor(private addrateservice: AddRateService, private router: Router, private resUserService: ResUserService) { }



  

  ngOnInit() {

    this.role = localStorage.getItem('admin');


    this.addrateservice.getRates().subscribe(
      res => {
        this.rates = res['rate']
      },
      err => {
        console.log(err);
      }
    )


    if (localStorage.getItem('token')) {

      this.resUserService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user']
        },
        err => {
          console.log(err);
        }
      );

    } else {

    }


  }

  onSubmit(form: NgForm) {
    this.addrateservice.postRate(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.refreshRateList();
      },
      err => {
        if (err.status === 422) {
          this.serverErroeMessages = err.error.join('<br/>');
        } else {
          this.serverErroeMessages = 'Something wrong contact admin !';
        }
      }
    );


    
  }

  openForm() {
    if (this.val == true) {
      this.val = false;
    } else {

      this.val = true;
    }

  }

  isLogged() {
    this.data = localStorage.getItem('token');
    if (this.data) {
      //  console.log(this.data);
      return 1;
    } else {
      // console.log('No token')
      return 0;
    }
  }

  logOut() {
    localStorage.clear();


  }

  deleteItem(_id: string, form: NgForm) {
    if (confirm('Are you sure delete this record ?') == true) {
      this.addrateservice.deleteitem(_id).subscribe((res) => {
        console.log(_id);
        this.refreshRateList();
        // this.resetForm(form);
      });
    }
  }


  refreshRateList() {
    this.addrateservice.getRates().subscribe((res) => {
      this.rates = res['rate'];
    })
  }


  addRes(form: NgForm) {
    this.resUserService.postresUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
          // console.log(err)
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.resUserService.selectedresUser = {
      // _id: '',
      fName: '',
      lName: '',
      id: '',
      email: '',
      tp: '',
      password: '',
      role: '',
      // saltSecret: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }




}




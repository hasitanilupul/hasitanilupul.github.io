import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, AbstractControl, Validator } from '@angular/forms';
import { AddRateService } from '../shared/addrate.service';
import { Router } from '@angular/router';
import { ResUserService } from '../../app/shared/res-user.service'
import { resUser } from 'src/app/shared/resuser.model';
import { element } from '@angular/core/src/render3';
// import { HttpClient } from '@angular/common/http';

import { DomSanitizer } from '@angular/platform-browser';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AddRateService, ResUserService]
})
export class HomeComponent implements OnInit {




  SERVER_URL = "http://localhost:3000/api/upload";
  uploadForm: FormGroup;


  public val = true;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  tpRegex = /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;

  showSucessMessage: boolean;
  serverErroeMessages: String;
  serverErrorMessages: String;

  userDetails = new resUser;
  role;
  data;
  file;

  rates: any[];
  preview;
  addrateForm;

  name: string;
  comment: string;
  // imagg:any;




  constructor(private addrateservice: AddRateService, private router: Router, private resUserService: ResUserService, private _sanitizer: DomSanitizer) { }






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


    // const formData = new FormData();

    // formData.append('Image',this.preview);
    // formData.append('Name',this.name);
    // formData.append('Comment',this.comment);

    // this.imagg = formData.get('Image');


    this.addrateservice.postRate(this.name, this.comment, this.preview).subscribe(
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




    //get form data
    // console.log(formData.get('Image'));


  }


  getName(evnt) {
    console.log(evnt.srcElement.value);
    this.name = evnt.srcElement.value;
  }

  getComment(event) {
    console.log(event.srcElement.value);
    this.comment = event.srcElement.value;
  }

  addPic(event) {

    this.file = (event.target as HTMLInputElement).files[0];

    //File preview
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.preview = reader.result as string;
    }


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
    if (this.data)
      return 1;
    else
      return 0;

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
    form.value.userPic=this.preview;
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
      userPic:'',
      password: '',
      role: '2',
      // saltSecret: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }




}




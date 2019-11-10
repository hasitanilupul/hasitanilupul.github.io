import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, AbstractControl, Validator } from '@angular/forms';
import { AddRateService } from '../shared/addrate.service';
import { Router } from '@angular/router';
import { ResUserService } from '../../app/shared/res-user.service'
import { resUser } from 'src/app/shared/resuser.model';
import { element } from '@angular/core/src/render3';
// import { HttpClient } from '@angular/common/http';






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

  name:string;
  comment:string;
  
  



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

    // this.addrateForm = new FormGroup({
    //   name: new FormControl(),
    //   Comment: new FormControl(),
    //   productImage: new FormControl()
    // });

    const formData = new FormData();
    // Object.keys(this.addrateForm.value).forEach(element => {
    //   console.log(this.addrateForm.value[element] + '->' + element);
    //   formData.append(element, this.addrateForm.value[element]);
    // });

    formData.append('imgg',this.file, this.file.name);
    formData.append('nameg',this.name);
    formData.append('commentg',this.comment);

    // this.addrateservice.postRate(this.file.value);
    console.log(formData);
    this.addrateservice.postRate(formData).subscribe(
      res => {
        console.log('yes');
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.refreshRateList();
      },
      err => {
        console.log('no');
        if (err.status === 422) {
          this.serverErroeMessages = err.error.join('<br/>');
        } else {
          this.serverErroeMessages = 'Something wrong contact admin !';
        }
      }
    );
    
  }


getName(evnt){
  console.log(evnt.srcElement.value);
    this.name = evnt.srcElement.value;
}

getComment(event){
  console.log(event.srcElement.value);
  this.comment = event.srcElement.value;
}

  addFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
    // this.file.patchValue({
    //   productImage: this.file
    // });
    // this.file.get('productImage').updateValueAndValidity()

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
      role: '2',
      // saltSecret: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }




}




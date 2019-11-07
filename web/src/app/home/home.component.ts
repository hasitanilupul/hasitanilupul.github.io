import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddRateService } from '../shared/addrate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AddRateService]
})
export class HomeComponent implements OnInit {

  public val = true;
  showSucessMessage: boolean;
  serverErroeMessages: String;

  role;
  data;

  rates: any[];
  constructor(private addrateservice: AddRateService, private router: Router) { }


  ngOnInit() {

    this.role=localStorage.getItem('admin');


    this.addrateservice.getRates().subscribe(
      res =>{
        this.rates = res['rate']
        console.log(res['rate'])
      },
      err =>{
        console.log(err);
      }
    )
  }

  onSubmit(form: NgForm) {
    this.addrateservice.postRate(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
        this.refreshRateList();
      },
      err => {
        if(err.status === 422){
          this.serverErroeMessages = err.error.join('<br/>');
        }else{
          this.serverErroeMessages = 'Something wrong contact admin !';
          }
      }
    );
  }

  openForm() {
    if(this.val==true){
    this.val = false;
  }else{
    
    this.val = true;
  }
  
  }

  isLogged(){
    this.data = localStorage.getItem('token');
    if(this.data){
      //  console.log(this.data);
      return 1;
    }else{
      // console.log('No token')
      return 0;
    }
  }

  logOut(){
    localStorage.clear();
    
    
  }

  deleteItem(_id:string, form: NgForm){
    if(confirm('Are you sure delete this record ?') == true){
      this.addrateservice.deleteitem(_id).subscribe((res)=>{
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
 
}


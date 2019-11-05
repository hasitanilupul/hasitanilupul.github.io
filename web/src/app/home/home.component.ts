import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddRateService } from '../shared/addrate.service';

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

  rates: any[];
  constructor(private addrateservice: AddRateService) { }

  ngOnInit() {
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
}


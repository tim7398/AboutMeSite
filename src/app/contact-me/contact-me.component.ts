import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {

  userInfo ={
    name:"",
    email:"",
    subject:"",
    message:""
  }
  
  constructor() { 

  }

  ngOnInit() {

  }

  onSubmit():void{
    console.log("hello:", this.userInfo);
  }

}

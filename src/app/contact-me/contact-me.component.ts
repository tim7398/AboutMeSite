import { Component, OnInit } from '@angular/core';
import {Http, Headers,RequestOptions} from "@angular/http";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';


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

  constructor(private http:Http, private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.toastyConfig.theme= 'material';
    this.toastyConfig.position = 'bottom-right';

  }
  newToast(Alert):void {
    console.log("HELLO GOT IN HERE:");
    let toastOptions: ToastOptions = {
        title: Alert.title,
        msg: Alert.msg,
        showClose: Alert.showClose,
        timeout: Alert.timeout,
        theme: Alert.theme,
        onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function(toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
        }
    };

    if(Alert.success){
      this.toastyService.success(toastOptions);
      return;
    }
    this.toastyService.error(toastOptions);

}
  ngOnInit() {

  }

  formReset():void{
    let form = document.forms["contactForm"];
    form.reset();
  }

  onSubmit():void{
    console.log("hello:", this.userInfo);
    let Alert;
    //json object to be sent to mid tier for processing
    const email ={
      "subject":this.userInfo.subject,
      "from":this.userInfo.email,
      "to":"tim7398@gmail.com",
      "message": this.userInfo.message,
      "name":this.userInfo.name
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({headers: headers});
    this.http.post('/api/email', JSON.stringify(email), requestOptions)
    .subscribe((data)=> {
      console.log(data);
      Alert ={
        title: 'Message Sent',
        msg: 'I have received the message. Expect a response within a day.',
        showClose:true,
        timeout: 500000,
        theme:'material',
        success: true
      }
      this.newToast(Alert);
      this.formReset();
      return;
    }),
    err=>{
      console.log("error in here")
      Alert ={
        title: 'Oh No!',
        msg: 'For some reason the message did not send. Email me at tim7398@gmail.com instead. Sorry!',
        showClose:true,
        timeout: 500000,
        theme:'material',
        success: false
      }
      this.newToast(Alert);
      console.log(err);
    };
    
  }

}

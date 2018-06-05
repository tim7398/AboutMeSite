import { Component } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {MessageAlert} from './util/toast';
import {Http, Headers, RequestOptions } from "@angular/http";
import {AuthGuard} from './auth.guard'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'app';
  constructor(private auth: AuthGuard, private http: Http,private userService:UserService, private route:Router, private MessageAlert:MessageAlert){
    console.log("app service:", userService.getIsLoggedIn());

  }

  navigation(location):void{
    this.route.navigate([location]);
  }
  render(){

  }
  logout():void{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({headers: headers});

    this.userService.setLoggedOut();
    this.userService.clearUserInfo();
    let Alert = {
      title: 'Logged out',
      showClose: true,
      timeout: 5000,
      theme: 'material',
      success: false
    }

    this.http.get('/api/logout',requestOptions).subscribe(resp=>{
      this.MessageAlert.newToast(Alert);
      this.route.navigate(['/']);
    },err=>{
      let errAlert = {
        title: 'Error Logging Out',
        showClose: true,
        timeout: 5000,
        theme: 'material',
        success: false
      }
        this.MessageAlert.newToast(errAlert);
      });


    

    return;
  }


  async AuthenticateEachUser(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({headers: headers});
    this.http.post('/api/authenticate',requestOptions).subscribe(info=>{
      console.log("come in here")
      let data = info.json();
      if(data.auth)
      {
        this.userService.setLoggedIn();
        this.userService.setUserInfo(data);
        this.auth.loading = false;
      }
    },(error=>{
      console.log("come in here error")
      this.auth.loading = false;
    }))
    
    console.log("loading:", this.auth.loading)

  }
}



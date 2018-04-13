import { Component } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {MessageAlert} from './util/toast'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'app';
  constructor(private userService:UserService, private route:Router, private MessageAlert:MessageAlert){
    console.log("app service:", userService.getIsLoggedIn());
  }

  navigation(location):void{
    this.route.navigate([location]);
  }
  logout():void{
    this.userService.setLoggedOut();
    let Alert = {
      title: 'You Are Logged Out',
      showClose: true,
      timeout: 5000,
      theme: 'material',
      success: true
    }

    this.route.navigate(['/']).then(()=>{
      this.MessageAlert.newToast(Alert);
    });

    return;
  }
}



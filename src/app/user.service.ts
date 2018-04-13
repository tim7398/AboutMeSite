import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isloggedIn:boolean;
  private userInfo;

  //default not logged in
  constructor() { 
    console.log("userinfo:", this.isloggedIn);
  }

  getIsLoggedIn():boolean{
    return this.isloggedIn;
  }

  getUserInfo():any{
    return this.userInfo;
  }

  //set the log in to be true
   setLoggedIn():void{
    this.isloggedIn = true;
  }

  //set the log out to be true
   setLoggedOut():void{
    this.isloggedIn = false;
  }

  //set the userinfo
   setUserInfo(userInfo):void{
    
    //makes sure a value is set. 
    if(userInfo.company === undefined || userInfo.company===null){
      userInfo.company = "N/A";
    }
    if(userInfo.email === undefined || userInfo.email === null){
      userInfo.email = "N/A";
    }

    this.userInfo={
      username: userInfo.username,
      company: userInfo.company,
      email: userInfo.email
    };

  }
   clearUserInfo():void{
    this.userInfo={};
  }

}

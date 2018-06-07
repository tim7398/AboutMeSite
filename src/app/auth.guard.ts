import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import {Http, Headers,RequestOptions} from "@angular/http";


@Injectable()
export class AuthGuard implements CanActivate {
  loading:boolean = true;
  constructor(private router:Router,private http:Http, private user:UserService){

  }
  async canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    let isAuth = await this.Authenticate();
    if(isAuth.auth){
        this.user.setLoggedIn();
        this.user.setUserInfo(isAuth);
        return true;
    }
      
    this.user.setLoggedOut();
    this.user.clearUserInfo();
    this.router.navigate(['/login']);

    return false;
     
  }
   async Authenticate(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({headers: headers});    
     let response = await this.http.post('/api/authenticate',requestOptions).toPromise()
     .then(res=>{return res.json()})
     .catch(err=>
      {
        response = {auth:false};
        return response;

      });
       return response;
  }
}

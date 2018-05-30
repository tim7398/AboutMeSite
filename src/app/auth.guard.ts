import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import {Http, Headers,RequestOptions} from "@angular/http";



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private http:Http, private user:UserService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("got in here")
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({headers: headers});
    this.http.post('/api/authenticate',requestOptions).subscribe((data)=>{
      console.log("i did it:", data);
    }),
    (error=>{
      console.log("error Authenticating:", error);
    });
      
    

    return this.user.getIsLoggedIn();
  }
}

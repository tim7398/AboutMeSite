import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component'
import {AuthGuard} from '../auth.guard'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthGuard) { }

  ngOnInit() {
    // mutes the background video on load
    // if(!this.auth.loading){
      let element = document.getElementById('myVideo') as HTMLVideoElement;
      element.muted=true;
    // }

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // mutes the background video on load
    let element = document.getElementById('myVideo') as HTMLVideoElement;
    element.muted=true;
  }

}

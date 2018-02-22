import { Component, OnInit } from '@angular/core';
import {Http, Headers,RequestOptions} from "@angular/http";
@Component({
  selector: 'app-past-project',
  templateUrl: './past-project.component.html',
  styleUrls: ['./past-project.component.scss']
})
export class PastProjectComponent implements OnInit {

  constructor(private http:Http) { }
  data:any;
  ngOnInit() {
    this.getData();
  }
  test(test){
    console.log("yo", this.data.Items.length);
    console.log("hi:", test);
  }
  getData (){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({headers: headers});
    this.http.get('/api/getprojects', requestOptions)
    .subscribe((data)=> {
      console.log("The Data", data);
      this.data = data.json();
      console.log("The", this.data);

    }),
    err=>{
      console.log("error in here")
    };
  }
}

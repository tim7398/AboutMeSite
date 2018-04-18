import { Component, OnInit } from '@angular/core';
import {Http, Headers,RequestOptions} from "@angular/http";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProjectModalComponent} from '../project-modal/project-modal.component';

@Component({
  selector: 'app-past-project',
  templateUrl: './past-project.component.html',
  styleUrls: ['./past-project.component.scss']
})
export class PastProjectComponent implements OnInit {
  data:any;
  reverseData:any;
  
  constructor( private http:Http, private modalService:MatDialog) { 
    
  }

  uploadModal(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
  };
  dialogConfig.height='400px';
  dialogConfig.width = '600px';
  

    let dialogRef = this.modalService.open(ProjectModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  
  ngOnInit() {
    this.getData();
  }
  getData (){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({headers: headers});
    this.http.get('/api/getprojects', requestOptions)
    .subscribe((data)=> {
      console.log("The Data", data);
      this.data = data.json();
      this.reverseData = JSON.parse(JSON.stringify(this.data));
      this.reverseData.Items = this.reverseData.Items.reverse();
      console.log("The", this.data);

    }),
    err=>{
      console.log("error in here")
    };
  }
  // postData(){
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json; charset=utf-8');
  //   const requestOptions = new RequestOptions({headers: headers});

  //   this.http.post('/api/postprojects', requestOptions)
  //   .subscribe((data)=> {
  //     console.log("The Data", data);
  //     this.data = data.json();
  //     console.log("The", this.data);

  //   }),
  //   err=>{
  //     console.log("error in here")
  //   };

    
  // }
}

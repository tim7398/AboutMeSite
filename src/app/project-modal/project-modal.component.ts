import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  form: FormGroup;
  description:string;
  constructor( public dialogRef:MatDialogRef<ProjectModalComponent>,@Inject(MAT_DIALOG_DATA) data) {
    console.log("this the dat:", data)
    this.description = data.description;
   }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef.close();
  }
}


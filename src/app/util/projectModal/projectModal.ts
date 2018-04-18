import {MatDialogRef} from '@angular/material';

export class ProjectModal{
    constructor(public data:any, public dialogRef:MatDialogRef<ProjectModal>){}

    onNoClick(): void {
        this.dialogRef.close();
      }
}
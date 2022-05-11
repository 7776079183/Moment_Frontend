import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-dialog',
  templateUrl: './msg-dialog.component.html',
  styleUrls: ['./msg-dialog.component.scss']
})
export class MsgDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<MsgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
 

}

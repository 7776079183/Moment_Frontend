import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MomentService } from 'src/app/_services/moment.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdialogComponent } from 'src/app/moment/confirmdialog/confirmdialog.component';
import { MsgDialogComponent } from 'src/app/authentication/msg-dialog/msg-dialog.component'
import { AddmomentdialogComponent } from 'src/app/moment/addmomentdialog/addmomentdialog.component' 
export interface Element {
  sr_no:number
  full_name: string;
  image_url: string;
  title: string;
  tags: string[];
}
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent implements OnInit {
  ELEMENT_DATA: Element[] ;
  displayedColumns = ['sr_no', 'image_url', 'title','tags','action'];
  dataSource;
  loader = false;
  BASE_URL = environment.API_URL;
  constructor(private moment : MomentService, public dialog:MatDialog) { 
  
  }

  ngOnInit(): void {
    this.getMoments();
  }

  getMoments(){
    this.loader = true;
    this.moment.getMoments().subscribe((resp:any)=>{
      this.ELEMENT_DATA = resp.data.map((moment,index) => ({ sr_no:index+1, image_url: moment.image_url,_id:moment._id,title:moment.comment, tags:moment.tags}));
      this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
      this.loader = false;
    },(error)=>{
      console.log(error);
      this.loader = false;
   })
  }

  deleteMoment(element){
    console.log(element)
    let dialog = this.dialog.open(ConfirmdialogComponent, {
      data: {
          title: "CONFIRM",
          message: "Do you wnat to delete ?"
      },
      hasBackdrop: true
    });
    dialog.afterClosed().subscribe(data=>{
        if(data){
          this.moment.deleteMoments(element._id).subscribe((data)=>{
            let dialog = this.dialog.open(MsgDialogComponent, {
              data: {
                  title: "SUCCESS",
                  message: "Moment Deleted Successfuly"
              },
              hasBackdrop: true
            });
            dialog.afterClosed().subscribe(data=>{
              
            })
            this.getMoments();
          },(error)=>{
            console.log(error)
            if(error.errors && error.errors.length>0){
              let dialog = this.dialog.open(MsgDialogComponent, {
                data: {
                    title: "FAIL",
                    message: error.errors[0].msg
                },
                hasBackdrop: true
              });
              dialog.afterClosed().subscribe(data=>{
                
              })
            }else{
              let dialog = this.dialog.open(MsgDialogComponent, {
                data: {
                    title: "FAIL",
                    message: error.message
                },
                hasBackdrop: true
              });
              dialog.afterClosed().subscribe(data=>{
                
              })
            }
          })
        }
    })
  }

  addMoment(){
    let dialog = this.dialog.open(AddmomentdialogComponent, {
      data: {
          title: "Add Moment",
          action: "add",
      },
      hasBackdrop: false
    });
    dialog.afterClosed().subscribe(data=>{
      if(data){
        this.getMoments();
      }
    })
  }

  updateMoment(element){
    let dialog = this.dialog.open(AddmomentdialogComponent, {
      data: {
          title: "Update Moment",
          action: "update",
          udate_data: element
      },
      hasBackdrop: false
    });
    dialog.afterClosed().subscribe(data=>{
      this.getMoments();
    })
  }
}
  
  




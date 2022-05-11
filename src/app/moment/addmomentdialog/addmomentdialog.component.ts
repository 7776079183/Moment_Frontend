import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MsgDialogComponent } from 'src/app/authentication/msg-dialog/msg-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { MomentService } from 'src/app/_services/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addmomentdialog',
  templateUrl: './addmomentdialog.component.html',
  styleUrls: ['./addmomentdialog.component.scss']
})
export class AddmomentdialogComponent  {
  momentForm: FormGroup;
  submitted = false;
  loading = false;
  filetoupload:any;
  BASE_URL = environment.API_URL;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags : any[] = [];
  ngOnInit(): void {
      

  }
  constructor(private formBuilder: FormBuilder,public dialog:MatDialog,private moment : MomentService, 
    public dialogRef: MatDialogRef<AddmomentdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.momentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      tags: [], 
      moment_image:[]  
    });
    
    if(data.udate_data){
      this.createFile(data.udate_data.image_url,this.BASE_URL+data.udate_data.image_url);
      this.momentForm.controls.comment.setValue(data.udate_data.title);
      this.momentForm.controls.moment_image.setValue(this.filetoupload ? this.filetoupload.name:'');
      data.udate_data.tags.forEach(element => {
        this.tags.push(element)
      });
    }
  }
  get f() { return this.momentForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
   
  }
  changefile(event){
    this.filetoupload = event.target.files[0];
  }
  addMoment(){
    this.submitted = true;
    if (this.momentForm.invalid) {
        return;
    }
    this.loading = true;
    console.log(this.filetoupload)
    if(!['image/png','image/jpeg'].includes(this.filetoupload.type)){
      let dialog = this.dialog.open(MsgDialogComponent, {
        data: {
            title: "FAIL",
            message: 'Only allows png jpeg'
        },
        hasBackdrop: true
      });
      
      dialog.afterClosed().subscribe(data=>{

      })
      return;
    }
    var fd = new FormData();
    fd.append('comment',this.momentForm.value.comment);
    fd.append('moment_image',this.filetoupload);
    fd.append('tags',JSON.stringify(this.tags));
    if(this.data.action=='update'){
      fd.append('_id',this.data.udate_data._id)
      this.moment.updateMoment(fd).subscribe((data)=>{
        this.loading = false;
        this.dialogRef.close('yes');
        let dialog = this.dialog.open(MsgDialogComponent, {
          data: {
              title: "SUCCESS",
              message: 'Moment Updated Successfully'
          },
          hasBackdrop: true
        });
      },(error)=>{
        this.loading = true;
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
    }else{
      this.moment.addMoment(fd).subscribe((data)=>{
        this.loading = false;
        this.dialogRef.close('yes');
        let dialog = this.dialog.open(MsgDialogComponent, {
          data: {
              title: "SUCCESS",
              message: 'Moment Added Successfully'
          },
          hasBackdrop: true
        });
      },(error)=>{
        this.loading = true;
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
    
  }

  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  async createFile(file_name,path){
    let response = await fetch(path);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    let file = new File([data], file_name, metadata);
    console.log(file)
    this.filetoupload =  file;
    // ... do something with the file or return it
  }
  
}

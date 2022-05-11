import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { MsgDialogComponent } from 'src/app/authentication/msg-dialog/msg-dialog.component'
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private router:Router,private formBuilder: FormBuilder,private auth: AuthenticationService,public dialog:MatDialog) { }
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],   
    });

  }
  get f() { return this.loginForm.controls; }
  redirecttoSignup(){
    this.router.navigate(['/auth/sign-up'])
  }

  loginUser(){
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.auth.loginUser(this.loginForm.value).subscribe((data:any)=>{
      let dialog = this.dialog.open(MsgDialogComponent, {
        data: {
            title: "SUCCESS",
            message: 'User Logged In Successfully'
        },
        hasBackdrop: true
      });
      localStorage.setItem('token',data.token);
      dialog.afterClosed().subscribe(data=>{
        this.router.navigate(['/moment']);
      })
    },(error)=>{
      this.loading = false;
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

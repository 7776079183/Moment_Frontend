import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { MsgDialogComponent } from 'src/app/authentication/msg-dialog/msg-dialog.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private auth: AuthenticationService, public dialog:MatDialog,private router:Router) { }
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        full_name: ['', Validators.required],
        city: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required],
        
    }, {
        validator: this.mustMatch('password', 'confirmPassword')
    });

  }
  get f() { return this.registerForm.controls; }

  redirectLogin(){
    this.router.navigate(['/auth'])
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
  resisterUser(){
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    this.loading = true;
    this.auth.resgisterUser(this.registerForm.value).subscribe((data)=>{
      this.loading = false;
      let dialog = this.dialog.open(MsgDialogComponent, {
        data: {
            title: "SUCCESS",
            message: 'User Registered Successfully'
        },
        hasBackdrop: false
      });
      dialog.afterClosed().subscribe(data=>{
        this.redirectLogin()
      })
    
    },(error)=>{
      this.loading = false;
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

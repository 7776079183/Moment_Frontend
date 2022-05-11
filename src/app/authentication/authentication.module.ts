import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input";
import {  FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatDialogModule } from '@angular/material/dialog'; 
import { MsgDialogComponent } from 'src/app/authentication/msg-dialog/msg-dialog.component';

@NgModule({
  
  declarations: [SignInComponent, SignUpComponent,MsgDialogComponent],
  entryComponents: [
    MsgDialogComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports:[
    MsgDialogComponent
  ]
})
export class AuthenticationModule { }

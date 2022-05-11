import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentRoutingModule } from './moment-routing.module';
import { MomentComponent } from './moment.component';
import { MatTableModule } from '@angular/material/table';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material/chips'
import {  FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatFormFieldModule } from "@angular/material/form-field";

import { AddmomentdialogComponent } from './addmomentdialog/addmomentdialog.component'
@NgModule({
  entryComponents:[
    ConfirmdialogComponent,
    AddmomentdialogComponent
  ],
  declarations: [MomentComponent, ConfirmdialogComponent, AddmomentdialogComponent],
  imports: [
    
    CommonModule,
    MomentRoutingModule,
    MatTableModule,
    AuthenticationModule,
    MatDialogModule ,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule
  ]
 
})
export class MomentModule { }

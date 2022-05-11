import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MomentComponent } from './moment.component';

const routes: Routes = [
    {
      path:'',
      component:MomentComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MomentRoutingModule { }

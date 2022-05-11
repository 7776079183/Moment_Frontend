import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_helper/guards/auth.guard';
import { RevGuard } from 'src/app/_helper/guards/rev.guard'
const routes: Routes = [
  
  {
    path:'',
    canActivate:[AuthGuard],
    loadChildren:() => import('src/app/home/home.module').then(m => m.HomeModule )
  },
  {
    path:'auth',
    canActivate:[RevGuard],
    loadChildren:() => import('src/app/authentication/authentication.module').then(m => m.AuthenticationModule )
  },
  
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

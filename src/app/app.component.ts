import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Moment';
  isShowing: boolean;

  mode = {
    value:false
  }
  
  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }
 
  callMethods() {
     this.toggleSidenav();
  } 

}

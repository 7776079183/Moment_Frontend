  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

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
  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/auth'])
  }
}

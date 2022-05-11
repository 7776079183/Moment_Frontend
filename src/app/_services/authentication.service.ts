import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = environment.API_URL + 'api/';
  constructor(private http:HttpClient) { }
  resgisterUser(data){
    return this.http.post(this.API_URL + "user", data).pipe(map(res => {
      return res;
   }));
  }
  loginUser(data){
    return this.http.post(this.API_URL + "user/login", data).pipe(map(res => {
      return res;
    }));
  }
 
  getUserToken(){
    return localStorage.getItem('token')
  }
}

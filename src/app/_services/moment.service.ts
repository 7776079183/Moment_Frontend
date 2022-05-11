import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private API_URL = environment.API_URL + 'api/';
  constructor(private http:HttpClient) { }
  getMoments(){
    return this.http.get(this.API_URL + "moment").pipe(map(res => {
      return res;
    }));
  }

  deleteMoments(id){
    return this.http.delete(this.API_URL + "moment/"+id).pipe(map(res => {
      return res;
    }));
  }

  addMoment(data){
    return this.http.post(this.API_URL + "moment",data).pipe(map(res => {
      return res;
    }));
  }
  updateMoment(data){
    return this.http.put(this.API_URL + "moment",data).pipe(map(res => {
      return res;
    }));
  }
}

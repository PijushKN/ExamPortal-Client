import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from 'src/app/models/user/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private commonUrl:string='http://localhost:8080/user'

  constructor(private http:HttpClient) { }

  createUser(user:User){
    return this.http.post(this.commonUrl+'/',user);
  }
}

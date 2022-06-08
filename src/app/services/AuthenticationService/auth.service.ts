import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/login/user-login-details.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:String = 'http://localhost:8080/'

  constructor(private http:HttpClient) { }

  generateToken(userDetails:UserLoginDetails){
    return this.http.post(this.baseUrl+'generate-token',userDetails);
  }

  getCurrentUser(){
    return this.http.get(this.baseUrl+'get-current-user');
  }

  setToken(token:string){
    sessionStorage.setItem('token',token);
    return true;
  }

  isloggedIn(){
    let token = sessionStorage.getItem('token');
    if(token==undefined || token==null || token ==''){
      return false;
    }
    return true;
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return true;
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  setUser(user:any){
    sessionStorage.setItem(('user'),JSON.stringify(user));
  }

  getUser(){
    let user = sessionStorage.getItem('user');
    if(user!=null){
      return JSON.parse(user);
    }
    else{
      this.logout();
      return null;
    }
  }

  getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}

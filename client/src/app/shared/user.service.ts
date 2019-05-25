import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {User} from './user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  selectedUser:User={
    name:'',
    email:'',
    password:''
  };

  constructor(private http: HttpClient) { }

  CreateTheUser(user:User){
    return this.http.post(environment.apiBaseUrl+'/register',user);
  }

  signIn(authCredentials){
    return this.http.post(environment.apiBaseUrl+'/authenticateUser', authCredentials);
  }

  setTheJwtToken(jwtToken: string){
    localStorage.setItem('jwtToken',jwtToken);
  }

  removeTheJwtToken(){
    localStorage.removeItem('jwtToken');
  }

  getTheUserPayload(){
    var userJwtToken=localStorage.getItem('jwtToken');
    console.log(userJwtToken);
    if(userJwtToken){
      var userPayload=atob(userJwtToken.split('.')[1]);
      console.log(userPayload);
      return JSON.parse(userPayload);
    }else{
      return null;
    }
  }

  isUserLoggedIn(){
    var userPayload=this.getTheUserPayload();
    console.log('from loggedin'+ userPayload);
    if(userPayload){
      return userPayload.exp>Date.now()/1000;
    }else{
      return false;
    }
  }

}

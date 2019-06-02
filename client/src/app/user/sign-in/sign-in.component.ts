import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { ChatService } from '../../shared/chat.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
  //providers: [UserService] // UserService class from the Service
})
export class SignInComponent implements OnInit {

  constructor(private userService : UserService, private chatService : ChatService,  private router : Router){

  }

  model={
    email:'',
    password:''
  }
  emailRegx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  signErrorMessage:string;

  ngOnInit() {
    if(this.userService.isUserLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }else{
      this.router.navigateByUrl('/signin');
    }
  }

  onSubmit(form:NgForm){
    this.userService.signIn(form.value).subscribe(
      res=>{
        this.userService.setTheJwtToken(res['token']);
        this.router.navigateByUrl('/dashboard');
      },
      err=>{
        this.signErrorMessage=err.error.message;
      }
    )
  }

}
